export default function pricePlanDB(database){

    async function getAllPricePlans(){
        let result = await database.any('SELECT * FROM price_plan')
        return result
    }

    async function insertUser(username,pricePlanId) {
     
       try {
        await database.oneOrNone('INSERT INTO users (username, plan_id) VALUES ($1, $2)', [username, pricePlanId])
       } catch (error) {
        console.error('Error inserting user data:', error)
       }
    }

    async function getPlanUsers(theId){
       let result = await database.any('SELECT username FROM users WHERE plan_id = $1' , [theId])
       return result
    }


    return{
        getAllPricePlans,
        insertUser,
        getPlanUsers
    }
}