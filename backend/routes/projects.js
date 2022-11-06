const db = require('../models');
const {uploadProfile, uploadProject} = require('../utils/multer');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');

const router = express.Router();
const fs = require('fs');

// 프로젝트 리스트
router.get('/', async function(req, res) {
    if(!req.query.pageSize || !req.query.pageNumber){
        return res.status(400).json({"success": false, "reason": "페이지 사이즈와 페이지 수는 필수 입력사항 입니다."});
    }
    const pageSize = req.query.pageSize;
    const pageNumber = req.query.pageNumber;

    // userFilter: 0 유저 인증 없는 경우
    let userFilter = 0;
    if(req.query.userId){
        if(req.query.isAuthor){
            userFilter = 1; // 자신이 작성한 것
        }
        else if(req.query.isFavorite){
            userFilter = 2; // 자신이 즐겨찾기 한 것
        }
        else if(req.query.isApplied){
            userFilter = 3; // 자신이 신청한 것
        }
    }

    let orderStandard = 'createdAt';
    let order = 'desc';
    if(req.query.sortBy){
        if(req.query.sortBy === "favorite.desc"){
            orderStandard = 'stars';
        }
        else if(req.query.sortBy === "favorite.asc"){
            orderStandard = 'stars';
            order = 'asc';
        }
    }

    let projectList;
    let totalCount;
    let totalPages;
    try{
        // 자신이 작성한 프로젝트 리스트 가지고 오는 경우
        if(userFilter === 1){
            const keyword = req.query.keyword;
            totalCount = await db.Project.count({
                where:{
                    leader: req.query.userId
                }
            });
            totalCount = parseInt(totalCount);
            
            totalPages = parseInt(totalCount / pageSize);
            if(totalCount % pageSize > 0){
                totalPages = totalPages + 1;
            }
            
            // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우
            if(totalPages < pageNumber || pageNumber < 1){
                return res.status(404).json({
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "totalPages": totalPages,
                    "content": []
                });
            }

            let offset = (pageNumber - 1) * pageSize;
            projectList = await db.Project.findAll({
                raw: true,
                offset: offset,
                limit: pageSize,
                order:[[orderStandard, order]],
                where:{
                    leader: req.query.userId
                },
            });
        }
        // 자신이 즐겨찾기한 리스트를 가지고 오는 경우
        else if(userFilter === 2){
            const keyword = req.query.keyword;
            totalCount = await db.Star.count({
                where:{
                    user: req.query.userId
                }
            });
            totalCount = parseInt(totalCount);
            
            totalPages = parseInt(totalCount / pageSize);
            if(totalCount % pageSize > 0){
                totalPages = totalPages + 1;
            }
            
            // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우
            if(totalPages < pageNumber || pageNumber < 1){
                return res.status(404).json({
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "totalPages": totalPages,
                    "content": []
                });
            }

            let offset = (pageNumber - 1) * pageSize;
            projectList = await db.Project.findAll({
                include:[{
                    model: db.Star,
                    where:{user: req.query.userId}
                }],
                offset: offset,
                limit: pageSize,
                order:[[orderStandard, order]],
            });

            for(let i = 0; i < projectList.length ; i++){
                projectList[i] = projectList[i].dataValues;
            }
        }
        //자신이 참여 신청을 한 프로젝트 리스트 가지고 오기
        else if(userFilter === 3){
            const keyword = req.query.keyword;
            totalCount = await db.Participate.count({
                where:{
                    user: req.query.userId
                }
            });
            totalCount = parseInt(totalCount);
            
            totalPages = parseInt(totalCount / pageSize);
            if(totalCount % pageSize > 0){
                totalPages = totalPages + 1;
            }
            
            // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우
            if(totalPages < pageNumber || pageNumber < 1){
                return res.status(404).json({
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "totalPages": totalPages,
                    "content": []
                });
            }

            let offset = (pageNumber - 1) * pageSize;
            projectList = await db.Project.findAll({
                include:[{
                    model: db.Participate,
                    where:{user: req.query.userId}
                }],
                offset: offset,
                limit: pageSize,
                order:[[orderStandard, order]],
            });

            for(let i = 0; i < projectList.length ; i++){
                projectList[i] = projectList[i].dataValues;
            }
        }
        // 검색어가 있을 경우 리스트 가지고 오기
        else if(req.query.keyword){
            const keyword = req.query.keyword;
            totalCount = await db.Project.count({
                where:{
                    [Op.or]: [
                        {name:{[Op.substring]: keyword},},
                        {topic:{[Op.substring]: keyword},},
                        {stacks:{[Op.substring]: keyword},},
                    ]
                }
            });
            totalCount = parseInt(totalCount);
            
            totalPages = parseInt(totalCount / pageSize);
            if(totalCount % pageSize > 0){
                totalPages = totalPages + 1;
            }
            
            // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우
            if(totalPages < pageNumber || pageNumber < 1){
                return res.status(404).json({
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "totalPages": totalPages,
                    "content": []
                });
            }

            let offset = (pageNumber - 1) * pageSize;
            projectList = await db.Project.findAll({
                raw: true,
                offset: offset,
                limit: pageSize,
                order:[[orderStandard, order]],
                where:{
                    [Op.or]: [
                        {name:{[Op.substring]: keyword},},
                        {topic:{[Op.substring]: keyword},},
                        {stacks:{[Op.substring]: keyword},},
                    ]
                },
            });
        }
        // 검색어가 없을 경우 프로젝트 리스트 가지고 오기
        else{
            const keyword = req.query.keyword;
            totalCount = await db.Project.count({});
            totalCount = parseInt(totalCount);
            
            totalPages = parseInt(totalCount / pageSize);
            if(totalCount % pageSize > 0){
                totalPages = totalPages + 1;
            }
            
            // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우
            if(totalPages < pageNumber || pageNumber < 1){
                return res.status(404).json({
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "totalPages": totalPages,
                    "content": []
                });
            }

            let offset = (pageNumber - 1) * pageSize;
            projectList = await db.Project.findAll({
                raw: true,
                offset: offset,
                limit: pageSize,
                order:[[orderStandard, order]],
            });
        }
        
        let content = [];
        for(let i = 0; i < projectList.length; i++){
            let temp = new Object();
            temp.id = projectList[i].projectId;
            let leaderInfo = await db.User.findOne({
                raw: true,
                where:{
                    userId: projectList[i].leader
                }
            })
            temp.author = new Object();
            temp.author.id = leaderInfo.userId;
            temp.author.name = leaderInfo.name;
            temp.author.photoUrl = leaderInfo.image;
            temp.title = projectList[i].name;
            temp.subject = projectList[i].topic;
            temp.startDate = projectList[i].startTime;
            temp.endDate = projectList[i].endTime;
            temp.content = projectList[i].message;
            temp.skills = projectList[i].stacks.split('#');
            temp.photoUrl = projectList[i].image;
            temp.lastEdited = projectList[i].updatedAt;
            temp.capacity = projectList[i].required;
            temp.applicationCount = await db.Participate.count({
                where:{
                    project: projectList[i].projectId
                }
            });
            temp.favoriteCount = projectList[i].stars;
            temp.approvalCount = projectList[i].current;

            // user 확인이 된 경우에는 isFavorite(유저가 즐쳐찾기로 선택했는지 안했는지) 반환
            if(userFilter > 0){
                temp.isFavorite = false;
                let isStar = await db.Star.findOne({
                    where:{
                        project: projectList[i].projectId,
                        user: req.query.userId
                    }
                });
                if(isStar){
                    temp.isFavorite = true;
                }
            }

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
        return res.status(400).json({"success": false, "reason": "요청 처리 중 오류가 발생했습니다."});
    }
});

// 프로젝트 등록
router.post('/', uploadProject.single('photoUrl'), async function(req, res) {
    try{
        const token = req.cookies.swe42_team12;
        const key = process.env.SECRET_KEY;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 사용자가 존재하지 않을 때
        if(!user){
            return res.status(400).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        // 새로운 프로젝트 생성
        else{
            const body = req.body;
            let skills = body.skills.join('#');
            let contact = body.contact.method + '#' + body.contact.value;

            const projectInfo = {
                name: body.title,
                topic: body.subject,
                leader: identity.userId,
                contact: contact,
                stacks: skills,
                required: body.capacity,
                current: 0,
                stars: 0,
                startTime: body.startDate,
                endTime: body.endDate,
                image: req.file ? req.file.filename : "default-project-thumbnail.png",
                message: body.content ? body.content : "..."
            };
            
            await db.Project.create(projectInfo).then( result => {
                return res.status(201).json({"success":true, "reason": "프로젝트를 성공적으로 등록했습니다."});
            }).catch(err => {
                return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 요청해주세요"});
            });
            
        }
    }catch(err){
        // 토큰이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "토큰이 유효하지 않습니다."});
    }
});

// 랜덤 프로젝트
router.get('/random', async function(req, res) {
    let count = req.query.count;
    try{
        // 랜덤은 1~3개만 가능하도록 정함.
        if (count > 0 || count > 3){
            count = 3;
        }
        let projectList = await db.Project.findAll({
            raw: true,
        });

        // 혹시 전체 프로젝트가 count보다 적을 수 있기 때문
        if(projectList.length < count){
            count = projectList.length;
        }

        projectList.sort(() => Math.random() - 0.5);

        let content = [];
        for(let i = 0; i < count; i++){
            let temp = new Object();
            temp.id = projectList[i].projectId;
            let leaderInfo = await db.User.findOne({
                raw: true,
                where:{
                    userId: projectList[i].leader
                }
            })
            temp.author = new Object();
            temp.author.id = leaderInfo.userId;
            temp.author.name = leaderInfo.name;
            temp.author.photoUrl = leaderInfo.image;
            temp.title = projectList[i].name;
            temp.subject = projectList[i].topic;
            temp.startDate = projectList[i].startTime;
            temp.endDate = projectList[i].endTime;
            temp.content = projectList[i].message;
            temp.skills = projectList[i].stacks.split('#');
            temp.photoUrl = projectList[i].image;
            temp.lastEdited = projectList[i].updatedAt;
            temp.capacity = projectList[i].required;
            temp.applicationCount = await db.Participate.count({
                where:{
                    project: projectList[i].projectId
                }
            });
            temp.favoriteCount = projectList[i].stars;
            temp.approvalCount = projectList[i].current;
            content.push(temp);
        }
        return res.status(200).json({"content": content});
    }catch(err){
        return res.status(404).json({"reason": "요청 처리 중 오류가 발생했습니다."});
    }
});

// 프로젝트 상세 정보
router.get('/:id', async function(req, res) {
    let userFlag = false;
    let userId = '';
    try{
        const token = req.cookies.swe42_team12;
        const key = process.env.SECRET_KEY;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 사용자가 토큰이 유효해서 인증이 되었을 때
        if(user){
            userFlag = true;
            userId = identity.userId;
        }

    }catch(err){
        userFlag = false;
    }

    try{
        // 프로젝트 상세 정보 정리
        const project = await db.Project.findOne({
            where:{
                projectId: req.params.id
            }
        });

        let temp = new Object();
        temp.id = project.dataValues.projectId;
        temp.title = project.dataValues.name;
        temp.subject = project.dataValues.topic;
        temp.startDate = project.dataValues.startTime;
        temp.endDate = project.dataValues.endTime;

        temp.contact = new Object();
        let contact = project.dataValues.contact;
        contact = contact.split('#');
        temp.contact.method = contact[0];
        temp.contact.value = contact[1];

        temp.content = project.dataValues.message;
        let skills = project.dataValues.stacks.split('#');
        temp.skills = skills;
        temp.photoUrl = project.dataValues.image;
        temp.lastEdited = project.dataValues.updatedAt;
        temp.capacity = project.dataValues.required;
        temp.approvalCount = project.dataValues.current;
        temp.favoriteCount = project.dataValues.stars;
        temp.applicationCount = await db.Participate.count({
            where:{
                project: req.params.id
            }
        });

        temp.author = new Object();
        let leader = await db.User.findOne({
            where:{
                userId: project.dataValues.leader
            }
        });
        temp.author.id = leader.dataValues.userId;
        temp.author.name = leader.dataValues.name;
        temp.author.photoUrl = leader.dataValues.image;

        if(userFlag){
            temp.isFavorite = false;
            let isFavorite = await db.Star.findOne({
                where:{
                    project: req.params.id,
                    user: identity.userId
                }
            });
            if(isFavorite){
               temp.isFavorite = true; 
            }

            temp.userApplication = new Object();
            temp.userApplication.isApplied = false;
            let isApply = await db.Participate.findOne({
                where:{
                    project: req.params.id,
                    user: identity.userId
                }
            });
            if(isApply){
                temp.userApplication.isApplied = true;
                temp.userApplication.id = isApply.dataValues.id;
            }
        }

        return res.status(200).json(temp);

    }catch(err){
        // 해당 프로젝트가 존재하지 않을 경우 혹은 데이터베이스 에러
        return res.status(404).json({"reason": "요청 처리 중 오류가 발생했습니다."});;
    }
});

// 프로젝트 삭제
router.delete('/:id', async function(req, res) {
    try{
        const token = req.cookies.swe42_team12;
        const key = process.env.SECRET_KEY;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 사용자가 존재하지 않을 때
        if(!user){
            return res.status(400).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        // 토큰이 유효한 경우
        else{
            let project;
            try{
                project = await db.Project.findOne({
                    where:{
                        projectId: req.params.id,
                        leader: identity.userId
                    }
                });
                // 프로젝트 수정 권한이 사용자에게 없는 경우
                if(!project){
                    return res.status(200).json({"success": false, "reason": "프로젝트 수정 권한이 없습니다."});
                }
            }catch(err){
                return res.status(500).json({"success": false, "reason": "시스템 오류 발생. 다시 요청해주세요."});
            }

            try{
                //이미지가 기본 이미지가 아닐 경우 이미지 삭제
                if(project.dataValues.image !== "default-project-thumbnail.png"
                && fs.existsSync("../../frontend/public/images/profiles/" + project.dataValues.image)){
                    fs.unlinkSync("../../frontend/public/images/profiles/" + project.dataValues.image);
                }
                
                //참여 관계, 즐겨찾기 관계, 프로젝트 관계 모두 반영
                await db.Participate.destroy({where: {project: req.params.id}});
                await db.Star.destroy({where: {project: req.params.id}});
                await db.Project.destroy({where:{projectId: req.params.id}});
                
                // 프로젝트 삭제 완료
                return res.status(200).json({"success": true, "reason": "프로젝트가 삭제되었습니다."});
            }catch(err){
                // 시스템 오류
                return res.status(500).json({"success": false, "reason": "계정 삭제에 실패했습니다."});
            }
            
        }
    }catch(err){
        // 토큰이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "토큰이 유효하지 않습니다."});
    }
});

// 프로젝트 내용 수정
router.patch('/:id', uploadProject.single('photoUrl'), async function(req, res) {
    try{
        const token = req.cookies.swe42_team12;
        const key = process.env.SECRET_KEY;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 사용자가 존재하지 않을 때
        if(!user){
            return res.status(200).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        // 요청을 보낸 사용자의 토큰은 정상
        else{
            let project;
            try{
                project = await db.Project.findOne({
                    where:{
                        projectId: req.params.id,
                        leader: identity.userId
                    }
                });
                // 프로젝트 수정 권한이 사용자에게 없는 경우
                if(!project){
                    return res.status(200).json({"success": false, "reason": "프로젝트 수정 권한이 없습니다."});
                }
            }catch(err){
                return res.status(500).json({"success": false, "reason": "시스템 오류 발생. 다시 요청해주세요."});
            }

            try{
                // 프로젝트 썸네일 이미지를 바꾼경우
                if(req.file){
                    if(project.dataValues.image !== "default-project-thumbnail.png"
                    && fs.existsSync("../../frontend/public/images/projects/" + project.dataValues.image)){
                        fs.unlinkSync("../../frontend/public/images/projects/" + project.dataValues.image);
                    }
                    
                    await db.Project.update({image: req.file.filename},{where:{projectId: project.dataValues.projectId}});
                }

                // 프로젝트 이름을 변경하는 경우
                if(req.body.title){
                    await db.Project.update({name: req.body.title},{where:{projectId: project.dataValues.projectId}});
                }

                // 프로젝트 주제를 변경하는 경우
                if(req.body.subject){
                    await db.Project.update({topic: req.body.subject},{where:{projectId: project.dataValues.projectId}});
                }

                // 프로젝트 모집 인원을 변경하는 경우
                if(req.body.capacity){
                    await db.Project.update({required: req.body.capacity},{where:{projectId: project.dataValues.projectId}});
                }

                //프로젝트 예상 시작 시기를 변경하는 경우
                if(req.body.startDate){
                    await db.Project.update({startTime: req.body.startDate},{where:{projectId: project.dataValues.projectId}});
                }

                // 프로젝트 예상 종료 시기를 변경하는 경우
                if(req.body.endDate){
                    await db.Project.update({endTime: req.body.endDate},{where:{projectId: project.dataValues.projectId}});
                }

                // 프로젝트 연락 수단을 변경하는 경우
                if(req.body.contact){
                    let contact = body.contact.method + '#' + body.contact.value;
                    await db.Project.update({message: contact},{where:{projectId: project.dataValues.projectId}});
                }

                // 프로젝트 기술 스택을 변경하는 경우
                if(req.body.skills){
                    let skills = req.body.skills.join('#');
                    await db.Project.update({stacks: skills},{where:{projectId: project.dataValues.projectId}});
                }

                // 프로젝트 소개 메시지를 변경하는 경우
                if(req.body.content){
                    await db.Project.update({message: req.body.content},{where:{projectId: project.dataValues.projectId}});
                }

                // 개인 페이지 수정 완료
                return res.status(200).json({"success": true, "reason": "정보를 수정했습니다."});
            }catch(err){
                // 시스템 오류
                return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 요청해주세요."});
            }
            
        }
    }catch(err){
        // 토큰이 유효하지 않은 경우
        return res.status(200).json({"success": false, "reason": "토큰이 유효하지 않습니다."});
    }
});

// 프로젝트 찜하기
router.post('/:id/favorite', async function(req, res) {
    try{
        const token = req.cookies.swe42_team12;
        const key = process.env.SECRET_KEY;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 식별번호의 사용자가 존재하지 않을 때
        if(!user){
            return res.status(400).json({"success": false, "reason": "사용자 인증에 실패했습니다."});
        }
        
        let isStar = await db.Star.findOne({
            where:{
                project: req.params.id,
                user: identity.userId
            }
        });
        // 이미 찜을 해버린 상태 => 찜을 또 할 수가 없음
        if(isStar){
            return res.status(200).json({"success": false, "reason": "이미 즐겨찾기된 프로젝트 입니다."});
        }
        
        // 프로젝트 테이블에도 즐겨찾기 횟수 업데이트
        await db.Project.increment({stars: 1},{where:{projectId: req.params.id}});

        // 즐겨찾기 테이블에 추가
        await db.Star.create({
            project: req.params.id,
            user: identity.userId
        }).then( result => {
            return res.status(201).json({"success":true, "reason": "즐겨찾기에 등록되었습니다."});
        }).catch(err => {
            return res.status(500).json({"success":false, "reason": "시스템 오류가 발생했습니다. 다시 요청해주세요."});
        });

    }catch(err){
        // Token이 유효하지 않은 경우
        return res.status(401).json({"success":false, "reason": "토큰이 유효하지 않습니다."});
    }
});

// 프로젝트 찜해제
router.delete('/:id/favorite', async function(req, res) {
    try{
        const token = req.cookies.swe42_team12;
        const key = process.env.SECRET_KEY;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 식별번호의 사용자가 존재하지 않을 때
        if(!user){
            return res.status(400).json({"success": false, "reason": "사용자 인증에 실패했습니다."});
        }
        
        let isStar = await db.Star.findOne({
            where:{
                project: req.params.id,
                user: identity.userId
            }
        });
        // 즐겨찾기에 등록되어 있지 않음 => 또 삭제할 수가 없음
        if(!isStar){
            return res.status(200).json({"success": false, "reason": "이미 프로젝트가 즐겨찾기 상태가 아닙니다."});
        }
        
        // 프로젝트 테이블에도 즐겨찾기 횟수 업데이트
        await db.Project.decrement({stars: 1},{where:{projectId: req.params.id}});

        // 즐겨찾기 테이블에서 삭제
        await db.Star.destroy({
            where: {projectId: req.params.id, user: identity.userId}
        }).then( result => {
            return res.status(200).json({"success":true, "reason": "즐겨찾기에서 삭제했습니다."});
        }).catch(err => {
            return res.status(500).json({"success":false, "reason": "시스템 오류가 발생했습니다. 다시 요청해주세요."});
        });

    }catch(err){
        // Token이 유효하지 않은 경우
        return res.status(401).json({"success":false, "reason": "토큰이 유효하지 않습니다."});
    }
});

module.exports = router;