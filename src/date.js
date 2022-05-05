let date = new Date()
let randomId = Math.floor(Math.random() * 10).toString() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() 

export default {
    randomId
}