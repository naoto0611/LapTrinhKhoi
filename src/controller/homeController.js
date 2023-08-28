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
            `select * from public.exercises where ex_level = 'easy'`
        );
        return res.render('indexEasy.ejs', { easyQuestionsData: easyQuestions });
    }

    // get Questions data for medium level
    static getMediumQuestionData = async (req, res) => {
        const mediumQuestions = await db.query(
            `select * from public.exercises where ex_level = 'medium'`
        );
        return res.render('indexMedium.ejs', { mediumQuestionsData: mediumQuestions });
    }

    // get Questions data for medium level
    static getHardQuestionData = async (req, res) => {
        const hardQuestions = await db.query(
            `select * from public.exercises where ex_level = 'hard'`
        );
        return res.render('indexHard.ejs', { hardQuestionsData: hardQuestions });
    }
}

export default homeController;