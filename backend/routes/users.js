const db = require('../models');
const {uploadProfile, uploadProject, deleteImage} = require('../utils/multer');
const {Op} = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');

const router = express.Router();
const fs = require('fs');

//유저 리스트
router.get('/', async function (req, res) {
    if(!req.query.pageSize || !req.query.pageNumber){
        return res.status(400).json({"success": false, "reason": "입력 값이 부족합니다."});
    }
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);
    let content = [];

    try{
        // 검색 keyword가 있는 경우
        if(req.query.keyword){
            const keyword = req.query.keyword;
            let totalCount = await db.User.count({
                where:{
                    [Op.or]: [
                        {name:{[Op.substring]: keyword},},
                        {id:{[Op.substring]: keyword},},
                        {major:{[Op.substring]: keyword},},
                        {email:{[Op.substring]: keyword},},
                        {stacks:{[Op.substring]: keyword},},
                    ]
                }
            });
            totalCount = parseInt(totalCount);
            
            let totalPages = parseInt(totalCount / pageSize);
            if(totalCount % pageSize > 0){
                totalPages = totalPages + 1;
            }
            
            // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우

            if (totalCount == 0) {
                return res.status(200).json({
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "totalPages": totalPages,
                    "content": content
                });
            }
            if(totalPages < pageNumber || pageNumber < 1){
                return res.status(400).json({"success": false, "reason": "잘못된 접근입니다"});
            }

            let offset = (pageNumber - 1) * pageSize;
            let userList = await db.User.findAll({
                raw: true,
                offset: offset,
                limit: pageSize,
                order:[['userId', 'ASC']],
                where:{
                    [Op.or]: [
                        {name:{[Op.substring]: keyword},},
                        {id:{[Op.substring]: keyword},},
                        {major:{[Op.substring]: keyword},},
                        {email:{[Op.substring]: keyword},},
                        {stacks:{[Op.substring]: keyword},},
                    ]
                },
            });

            for(let i = 0; i < userList.length; i++){
                let temp = new Object();
                temp.userId = userList[i].userId;
                temp.name = userList[i].name;
                temp.department = userList[i].major;
                temp.introduction = userList[i].message;
                temp.skills = userList[i].stacks.split('#');
                temp.email = userList[i].email;
                temp.personalLink = userList[i].link ? userList[i].link : null;
                temp.photoUrl = userList[i].image;
                content.push(temp);
            }

            return res.status(200).json({
                "pageNumber": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCount,
                "totalPages": totalPages,
                "content": content
            });
        }
        // 검색 keyword가 없는 경우
        else{
            let totalCount = await db.User.count({});
            totalCount = parseInt(totalCount);

            let totalPages = parseInt(totalCount / pageSize);
            if(totalCount % pageSize > 0){
                totalPages = totalPages + 1;
            }

            // 요청한 페이지 넘버가 1보다 작거나 totalPages 보다 큰 경우
            if (totalCount == 0) {
                return res.status(200).json({
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "totalPages": totalPages,
                    "content": content
                });
            }

            if(totalPages < pageNumber || pageNumber < 1){
                return res.status(400).json({"success": false, "reason": "잘못된 접근입니다"});
            }

            let offset = (pageNumber - 1) * pageSize;
            let userList = await db.User.findAll({
                raw: true,
                offset: offset,
                limit: pageSize,
                order:[['userId', 'ASC']],
            });

            let content = [];
            for(let i = 0; i < userList.length; i++){
                let temp = new Object();
                temp.userId = userList[i].userId;
                temp.name = userList[i].name;
                temp.department = userList[i].major;
                temp.introduction = userList[i].message;
                temp.skills = userList[i].stacks.split('#');
                temp.email = userList[i].email;
                temp.personalLink = userList[i].link ? userList[i].link : null;
                temp.photoUrl = userList[i].image;
                content.push(temp);
            }

            return res.status(200).json({
                "pageNumber": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCount,
                "totalPages": totalPages,
                "content": content
            });
        }
    }catch(err){
        return res.status(400).json({"success": false, "reason": "잘못된 접근 입니다."});
    }
});

// 내 정보 조회
router.get('/me', async function (req, res) {
    console.log("me")
    try{
        
        const token = req.headers.authorization.split('Bearer ')[1];
        const key = process.env.JWT_SECRET;
        const identity = jwt.verify(token, key);
        console.log(identity);
        
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 식별번호의 사용자가 존재하지 않을 때
        if(!user){
            return res.status(404).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        
        let temp = new Object();
        temp.userId = user.dataValues.userId;
        temp.name = user.dataValues.name;
        temp.department = user.dataValues.major;
        temp.introduction = user.dataValues.message;
        temp.skills = user.dataValues.stacks.split('#');
        temp.email = user.dataValues.email;
        temp.personalLink = user.dataValues.link ? user.dataValues.link : null;
        temp.photoUrl = user.dataValues.image;

        return res.status(200).json(temp);

    }catch(err){
        // Token이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "유효하지 않은 접근입니다."});

    }
});

//유저 상세 정보
router.get('/:id', async function (req, res) {
    const userId = req.params.id;
    const user = await db.User.findOne({
        where:{
            userId: userId
        }
    });
    
    // 해당 유저 식별 번호에 해당하는 계정이 있을 경우
    if(user){
        let temp = new Object();
        temp.userId = user.dataValues.userId;
        temp.name = user.dataValues.name;
        temp.department = user.dataValues.major;
        temp.introduction = user.dataValues.message;
        temp.skills = user.dataValues.stacks.split('#');
        temp.email = user.dataValues.email;
        temp.personalLink = user.dataValues.link ? user.dataValues.link : null;
        temp.photoUrl = user.dataValues.image;

        return res.status(200).json(temp);
    }
    // 해당 유저 식별 번호에 해당하는 계정이 없을 경우
    else{
        return res.status(404).json({"success": false, "reason": "존재하지 않는 유저입니다."});
    }
});

//로그인
router.post('/login', async function(req, res) {
    let body = req.body;
    //1. Input이 충분하지 않았을 경우
    if(!body.id || !body.password){
        return res.status(400).json({"success": false, "reason": "입력 값이 부족합니다."});
    }

    let user = await db.User.findOne({
        attributes: ['userId', 'id', 'password', 'name', 'email'],
        where:{
            id: body.id
        }
    });
    //2. 해당 아이디가 등록되어 있지 않은 경우
    if (!user){
        return res.status(200).json({"success": false, "token": "", "reason": "아이디, 비밀번호를 다시 확인해주세요."});
    }
    //3. 패스워드 일치 여부 확인
    else{
        const hashedPassword = crypto.createHash("sha512").update(body.password).digest("base64");
        // 3. 패스워드가 일치 하지 않음 
        if(user.dataValues.password !== hashedPassword){
            return res.status(200).json({"success": false, "token": "", "reason": "아이디, 비밀번호를 다시 확인해주세요."});
        }
        // 4. 로그인 성공
        else{
            const token = await jwt.sign({
                userId: user.dataValues.userId,
                id: user.dataValues.id,
                name: user.dataValues.name,
                email: user.dataValues.email
            },
            process.env.JWT_SECRET, 
            {
                subject: "skku_team_builder",
                expiresIn: "60m",
                issuer: "swe42_team12"
            });

            res.cookie("swe42_team12", token, {});

            return res.status(201).json({"success": true, "token": token, "reason": "로그인 성공!!"});
        }
    }
});

// 회원 가입
router.post('/register', uploadProfile.single('photoUrl'), async function(req, res){
    let body = req.body;
    // 보낸 정보들이 필수 조건을 만족하는지 확인
    // 1. 보낸 인풋 중 필수 인풋이 없는 경우
    if( !body.id || !body.password || !body.email || !body.department || !body.name){
        return res.status(400).json({"success": false, "reason": "필수 입력 사항 불충분(필수 입력 사항: 아이디, 패스워드, 이름, 이메일, 전공)"});
    }
    // 2. 우리 학교 이메일이 아닌 경우
    if( !body.email.endsWith('skku.edu') && !body.email.endsWith('g.skku.edu') ){
        return res.status(400).json({"success": false, "reason": "성균관대학교 이메일만 사용 가능합니다!!"});
    }

    //중복된 아이디와 중복된 이메일이 있는지 검사
    //1. 아이디가 중복된 경우
    let exUser = await db.User.findOne({
        where:{
            id: req.body.id
        }
    });
    if (exUser){
        return res.status(400).json({"success": false, "reason": "중복된 아이디가 사용 중입니다."});
    }
    //2. 이메일이 중복된 경우
    exUser = await db.User.findOne({
        where:{
            email: req.body.email
        }
    });
    if (exUser){
        return res.status(400).json({"success": false, "reason": "이미 사용 중인 이메일 입니다."});
    }

    // 중복된 아이디 이메일도 없고 인풋의 조건이 충족되면 생성
    const hashedPassword = crypto.createHash("sha512").update(body.password).digest("base64");
    let stacks = ""
    if (body.skills) {
        stacks = body.skills.join('#');
    }

    const userInfo = {
        id: body.id,
        password: hashedPassword,
        name: body.name,
        major: body.department,
        email: body.email,
        link: body.personalLink ? body.personalLink: null,
        image: req.file ? req.file.location : null,
        stacks: stacks,
        message: body.introduction ? body.introduction : "..."
    };
    
    await db.User.create(userInfo).then( result => {
        return res.status(201).json({"success":true, "reason": "회원가입되었습니다."});
    }).catch(err => {
        return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 시도해주세요"});
    });
});


//내 정보 수정
router.post('/me', uploadProfile.single('photoUrl'), async function(req, res) {
    try{
        const token = req.headers.authorization.split('Bearer ')[1];
        const key = process.env.JWT_SECRET;

        if (!req.file && !req.body.id && !req.body.password && !req.body.name && !req.body.department
            && !req.body.email && !req.body.personalLink && !req.body.skills && !req.body.introduction  ) {
            return res.status(400).json({"success": false, "reason": "입력 값이 부족합니다."});
        }

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 사용자가 존재하지 않을 때
        if(!user){
            return res.status(404).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        // 계정 수정 가능한 경우
        else{
            try{
                // 이미지를 바꾼경우
                if(req.file){
                    //이미지가 기본 이미지가 아닐 경우 이미지 삭제
                    if(project.dataValues.image !== null){
                        await deleteImage(project.dataValues.image);
                    }
                    await db.User.update({image: req.file.location},{where:{userId: identity.userId}});
                }

                //이름을 변경하는 경우
                if(req.body.name){
                    await db.User.update({name: req.body.name},{where:{userId: identity.userId}});
                }

                //전공을 변경하는 경우
                if(req.body.department){
                    await db.User.update({major: req.body.department},{where:{userId: identity.userId}});
                }

                //이메일을 변경하는 경우
                if(req.body.email){
                    if( !body.email.endsWith('skku.edu') && !body.email.endsWith('g.skku.edu') ){
                        return res.status(400).json({"success": false, "reason": "성균관대학교 이메일만 사용 가능합니다!!"});
                    }
                    await db.User.update({email: req.body.email},{where:{userId: identity.userId}});
                }

                //개인 페이지 링크를 변경하는 경우
                if(req.body.personalLink){
                    await db.User.update({link: req.body.personalLink},{where:{userId: identity.userId}});
                }

                //개인 소개 메시지를 변경하는 경우
                if(req.body.introduction){
                    await db.User.update({message: req.body.introduction},{where:{userId: identity.userId}});
                }

                //기술 스택을 변경하는 경우
                if(req.body.skills){
                    let skills = req.body.skills.join('#');
                    await db.User.update({stacks: skills},{where:{userId: identity.userId}});
                }

                // 개인 페이지 수정 완료
                return res.status(200).json({"success": true, "reason": "정보를 수정했습니다."});
            }catch(err){
                // 시스템 오류
                return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 시도해주세요"});
            }
            
        }
    }catch(err){
        // 토큰이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "유효하지 않은 접근입니다."});

    }
});

// 회원 탈퇴
router.delete('/me', async function(req, res) {
    try{
        const token = req.headers.authorization.split('Bearer ')[1];
        const key = process.env.JWT_SECRET;

        const identity = jwt.verify(token, key);
        const user = await db.User.findOne({
            where:{
                userId: identity.userId
            }
        });

        // 해당 사용자가 존재하지 않을 때
        if(!user){
            return res.status(404).json({"success": false, "reason": "사용자가 존재하지 않습니다."});
        }
        // 계정 삭제 가능한 경우
        else{
            try{
                //이미지가 기본 이미지가 아닐 경우 이미지 삭제
                if(project.dataValues.image !== null){
                    await deleteImage(project.dataValues.image);
                }
                
                //참여 관계, 즐겨찾기 관계, 프로젝트 관계 모두 반영
                
                // 사용자가 참여가 승인된 프로젝트 찾기
                let projectList = await db.Participate.findAll({
                    raw: true,
                    where:{
                        user: identity.userId,
                        accept: 1
                    }
                });
                // 프로젝트 승인 처리된 프로젝트들의 current(현재 참여 인원 1씩 감소)
                for(let i = 0 ; i < projectList.length; i++){
                    await db.Project.decrement({current: 1},{where:{projectId: projectList[i].project}});
                }
                await db.Participate.destroy({where: {user: identity.userId}});

                // 사용자가 즐겨찾기한 프로젝트 찾기
                projectList = await db.Star.findAll({
                    raw: true,
                    where:{
                        user: identity.userId
                    }
                });
                // 프로젝트 승인 처리된 프로젝트들의 stras(현재 참여 인원 1씩 감소)
                for(let i = 0 ; i < projectList.length; i++){
                    await db.Project.decrement({stars: 1},{where:{projectId: projectList[i].project}});
                }
                await db.Star.destroy({where: {user: identity.userId}});
                
                await db.Project.destroy({where:{leader: identity.userId}});
                await db.User.destroy({where: {userId: identity.userId}});
                
                // 탈퇴 완료
                return res.status(200).json({"success": true, "reason": "회원탈퇴가 완료되었습니다."});
            }catch(err){
                // 시스템 오류
                return res.status(500).json({"success": false, "reason": "시스템 오류가 발생했습니다. 다시 시도해주세요"});
            }
            
        }
    }catch(err){
        // 토큰이 유효하지 않은 경우
        return res.status(401).json({"success": false, "reason": "유효하지 않은 접근입니다."});
    }
});

module.exports = router;