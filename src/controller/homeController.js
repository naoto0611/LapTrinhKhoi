import db from "../configs/connectDB.js";

class homeController {
    //easy level ranking
    static getRankingData = async (req, res) => {
        const easy = await db.query(
            `select u.username, r.result_point 
            from public.users u, public.result r
            where u.userid = r.userid and r.result_level = 'easy'
            order by r.result_point desc
            limit 5`
            );
        // console.log(JSON.stringify(rows[2].username));
        const medium = await db.query(
            `select u.username, r.result_point 
            from public.users u, public.result r
            where u.userid = r.userid and r.result_level = 'medium'
            order by r.result_point desc
            limit 5`
            );
        //console.log(rows);
        const hard = await db.query(
            `select u.username, r.result_point 
            from public.users u, public.result r
            where u.userid = r.userid and r.result_level = 'hard'
            order by r.result_point desc
            limit 5`
            );
            //return res.render('homepage.ejs', { mediumRankingData: rows})
        return res.render('homepage.ejs', { easyRankingData: easy, mediumRankingData: medium, hardRankingData: hard })
    }

    // get Questions data for easy level
    static getEasyQuestionData = async (req, res) => {
        const easyQuestions = await db.query(
            `select * from public.exercises where ex_level = 'easy'
            order by random()
            limit 15`
        );
        return res.render('indexEasy.ejs', { easyQuestionsData: easyQuestions });
    }

    // get Questions data for medium level
    static getMediumQuestionData = async (req, res) => {
        const mediumQuestions = await db.query(
            `select * from public.exercises where ex_level = 'medium'
            order by random()
            limit 15`
        );
        return res.render('indexMedium.ejs', { mediumQuestionsData: mediumQuestions });
    }

    // get Questions data for medium level
    static getHardQuestionData = async (req, res) => {
        const hardQuestions = await db.query(
            `select * from public.exercises where ex_level = 'hard'
            order by random()
            limit 15`
        );
        return res.render('indexHard.ejs', { hardQuestionsData: hardQuestions });
    }

    static getQuestionDetail = async (req, res) => {
        let question = await db.query(`select * from public.exercises`);
        return res.render('admin.ejs', { questionDetail: question });
    }

    // static editUser = async (req, res) => {
    //     let id = req.params.id;
    //     let user = await db.query(`Select * from public.customer where cus_id = ${id}`);
    //     //console.log(JSON.stringify(user))
    //     return res.render('update.ejs', { dataUser: user[0] });

    // }

    // static updateInfo = async (req, res) => {
    //     let { name, address, phone, id } = req.body;
    //     await db.query(`update public.customer 
    //     set cus_name='${name}', cus_address='${address}', cus_phone = '${phone}' 
    //     where cus_id = '${id}' `)
    //     return res.redirect("/");
    // }

    static addQuestion = async (req, res) => {
        let { question, answer, level } = req.body;
        await db.query(`insert into public.exercises(ex_question,ex_answer,ex_level) 
        values('${question}','${answer}','${level}')`)
        return res.redirect('/admin');
    }

    // static deleteUser = async (req, res) => {
    //     let id = req.body.delete_id;
    //     await db.query(`delete from public.customer where cus_id='${id}'`);
    //     return res.redirect("/");
    // }
}

export default homeController;