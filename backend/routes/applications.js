const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');

const router = express.Router();

// 참여 신청자 리스트
router.get('/', async function(req, res) {
    try{
        const token = req.headers.authorization.split('Bearer ')[1];
        const key = process.env.JWT_SECRET;

        if (!req.query.projectId) {
            return res.status(400).json({"success": false, "reason": "입력 값이 부족합니다."});
        }

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 식별번호의 사용자가 존재하지 않을 때
        if(!user){
            return res.status(404).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        
        let isLeader = await db.Project.findOne({
            where:{
                projectId: req.query.projectId,
                leader: identity.userId
            }
        });
        // 주어진 프로젝트의 리더가 아닙니다 => 권한이 없음
        if(!isLeader){
            return res.status(403).json({"success": false, "reason": "해당 프로젝트 관리 권한이 없습니다."});
        }
        if(!req.query.pageSize || !req.query.pageNumber){
            return res.status(400).json({"success": false, "reason": "입력 값이 부족합니다."});
        }
        const pageNumber = parseInt(req.query.pageNumber);
        const pageSize = parseInt(req.query.pageSize);

        let totalCount = await db.Participate.count({where:{project : req.query.projectId}});
        totalCount = parseInt(totalCount);

        let totalPages = parseInt(totalCount / pageSize);
        if(totalCount % pageSize > 0){
            totalPages = totalPages + 1;
        }

        // 빈 경우 빈 배열을 반환
        if(totalCount < 1){
            return res.status(200).json({
                "pageNumber": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCount,
                "totalPages": totalPages,
                "content": []
            });
        }

        // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우
        if(totalPages < pageNumber || pageNumber < 1){
            return res.status(400).json({"success": false, "reason": "잘못된 접근입니다"});
        }

        let offset = (pageNumber - 1) * pageSize;
        let applyList = await db.Participate.findAll({
            raw: true,
            offset: offset,
            limit: pageSize,
            order:[['id', 'ASC']],
            where:{
                project: req.query.projectId
            }
        });

        let content = [];

        for(let i = 0; i < applyList.length; i++){
            let temp = new Object();

            temp.id = applyList[i].id;
            let status = "waiting";
            if(applyList[i].accept == 1){
                status = "approved";
            }
            else if(applyList[i].accept == 2){
                status = "rejected";
            }
            temp.status = status;
            temp.createdAt = applyList[i].createdAt;
            temp.author = new Object();
            let user = await db.User.findOne({
                attributes: ['userId', 'name', 'image'],
                where:{userId: applyList[i].user}
            })
            temp.author.id = user.dataValues.userId;
            temp.author.name = user.dataValues.name;
            temp.author.photoUrl = user.dataValues.image;

            content.push(temp);
        }

        return res.status(200).json({
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCount,
            "totalPages": totalPages,
            "content": content
        });

    }catch(err){
        // Token이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "유효하지 않은 접근입니다."});
    }
});

// 참여 신청하기(유저)
router.post('/', async function(req, res) {
    try{
        const token = req.headers.authorization.split('Bearer ')[1];
        const key = process.env.JWT_SECRET;

        // projectId가 주어지지 않으면 잘못된 요청
        if(!req.body.projectId){
            return res.status(400).json({"success": false, "reason": "입력 값이 부족합니다."});
        }

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 식별번호의 사용자가 존재하지 않을 때
        if(!user){
            return res.status(404).json({"success": false, "reason": "사용자가 존재하지 않습니다."});

        }
        
        let isJoin = await db.Participate.findOne({
            where:{
                project: req.body.projectId,
                user: identity.userId
            }
        });
        // 이미 신청서를 낸 상태 => 또 신청할 수는 없음
        if(isJoin){
            return res.status(400).json({"success": false, "reason": "이미 신청서를 제출한 프로젝트 입니다."});
        }

        // Particiapte 테이블에 레코드 생성
        await db.Participate.create({
            project: req.body.projectId,
            user: identity.userId,
            accept: 0
        }).then( result => {
            return res.status(201).json({"success":true, "reason": "프로젝트 신청서를 보냈습니다."});
        }).catch(err => {
            return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 시도해주세요"});
        });

    }catch(err){
        // Token이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "유효하지 않은 접근입니다."});
    }
});

// 참여 신청 여부 변경 (글 작성자)
router.patch('/:id', async function(req, res) {
    try{
        // projectId가 주어지지 않으면 잘못된 요청
        if(!req.body.projectId || !req.body.status){
            return res.status(400).json({"success": false, "reason": "입력 값이 부족합니다."});
        }

        const token = req.headers.authorization.split('Bearer ')[1];
        const key = process.env.JWT_SECRET;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 식별번호의 사용자가 존재하지 않을 때
        if(!user){
            return res.status(404).json({"success": false, "reason": "사용자가 존재하지 않습니다."});

        }
        
        let isLeader = await db.Project.findOne({
            include:[{
                model: db.Participate,
                where:{id: req.params.id}
            }],
            where:{
                projectId: req.body.projectId,
                leader: identity.userId
            }
        });
        // 해당 프로젝트에 관리자 권한이 없음
        if(!isLeader){
            return res.status(403).json({"success": false, "reason": "해당 프로젝트 관리 권한이 없습니다."});
        }

        // 사용자 요청에 따라서 업데이트 진행
        try{
            let participation = await db.Participate.findOne({where:{id: req.params.id}});

            // 대기 상태로 바꿈
            if(req.body.status === "waiting"){
                if(participation.dataValues.accept == 1){
                    await db.Project.decrement({current: 1},{where:{projectId: req.body.projectId}});
                }
                await db.Participate.update({accept: 0},{where:{id: req.params.id}});
                return res.status(200).json({"success": true, "reason": "신청서를 보류했습니다."});
            }
            // 신청 승인 상태로 바꿈
            else if(req.body.status === "approved"){
                if(participation.dataValues.accept != 1){
                    await db.Project.increment({current: 1},{where:{projectId: req.body.projectId}});
                }
                await db.Participate.update({accept: 1},{where:{id: req.params.id}});
                return res.status(200).json({"success": true, "reason": "신청서를 승인했습니다."});
            }
            // 신청 거절해버림
            else if(req.body.status === "rejected"){
                if(participation.dataValues.accept == 1){
                    await db.Project.decrement({current: 1},{where:{projectId: req.body.projectId}});
                }
                await db.Participate.update({accept: 2},{where:{id: req.params.id}});
                return res.status(200).json({"success": true, "reason": "신청서를 거절했습니다."});
            }
            // 처리할 수 없는 이상한 인풋이 들어옴
            else{
                return res.status(400).json({"success": false, "reason": "잘못된 접근입니다."});
            }

        }catch(err){
            return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 시도해주세요"});
        }

    }catch(err){
        // Token이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "유효하지 않은 접근입니다."});
    }
});

// 참여 신청 취소(유저)
router.delete('/:id', async function(req, res) {
    try {
        
        const token = req.headers.authorization.split('Bearer ')[1];
        const key = process.env.JWT_SECRET;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 식별번호의 사용자가 존재하지 않을 때
        if(!user){
            return res.status(404).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        
        let isJoin = await db.Participate.findOne({
            where:{
                id: req.params.id,
                user: identity.userId
            }
        });
        // 존재하지 않은 신청서 입니다. => 삭제할 게 없음
        if(!isJoin){
            return res.status(404).json({"success": false, "reason": "존재하지 않은 신청서 입니다."});
        }

        // 만약 프로젝트에 참여가 승인되었던 상태였으면 프로젝트 레코드의 current 1 감소
        if(isJoin.dataValues.accept == 1){
            await db.Project.decrement({current: 1},{where:{projectId: req.params.id}});
        }

        // 해당 신청 레코드 삭제
        await db.Participate.destroy({
            where: {id: req.params.id, user: identity.userId}
        }).then( result => {
            return res.status(200).json({"success":true, "reason": "참여 신청을 취소했습니다."});
        }).catch(err => {
            return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 시도해주세요"});
        });

    }catch(err){
        // Token이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "유효하지 않은 접근입니다."});
    }
});

module.exports = router;