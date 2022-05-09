import { data } from 'autoprefixer'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import Data from '../data.json'

export const useData = defineStore({
  id: 'main',
  state: () => ({
    data: Object,
    currentUser: Object,
    categories: null,
    valueOfSortByNumbers: '',
    filterValue: 'all',
  }),
  getters: {
    filterByStatus: (state) => {
      return (value) => state.data.filter((e) => e.status === value)
    },
    filterByCategory: (state) => {
      return (value) => state.data.filter(e => {
       return  e.status === 'suggestion' &&  e.category === value
      } )
    },
  },
  actions: {
    calculateTheNumberOfComments(){
      this.data.forEach(e => {
        e.commentsLenght = 0
        e.commentsLenght = e.comments.length
        e.comments.forEach(d => {
          if(d.replies){
            e.commentsLenght += d.replies.length
          }
        })
      })
    },
    randomId() {
      let date = new Date()
      return Math.floor(Math.random() * 10).toString() + date.getMinutes() + date.getSeconds() + date.getMilliseconds()
    },    
    loadData() {
      this.data = Data.productRequests
      this.currentUser = Data.currentUser
      this.data.filter(e => e.comments === undefined).forEach(d => d.comments = [])
      this.calculateTheNumberOfComments()
      console.log(this.data)
    },
    loadCategory() {
      this.categories = ["all", "UI", "UX", ...new Set(this.data.map(e => e.category))]
    },
    sortByNumbers(value) {
      this.valueOfSortByNumbers = value
      this.data.sort((a,b) => {
        if(this.valueOfSortByNumbers === "Most Comments"){
          return b.commentsLenght - a.commentsLenght
  
        } else if(this.valueOfSortByNumbers === "Least Comments"){
          return a.commentsLenght - b.commentsLenght 
  
        } else if(this.valueOfSortByNumbers === "Least Upvotes") {
          return a.upvotes - b.upvotes
          
        }else if(this.valueOfSortByNumbers === "Most Upvotes") {
          return b.upvotes - a.upvotes
        }
        })
    },
    getFilterValue(value){
      this.filterValue = value
    },
    addEditDeleteFeedback(data, id, removeFeedback){   
      let editedIndex = null
      if(id) 
         editedIndex = this.data.findIndex(e => e.id === id)
         
      if(id && removeFeedback)
        this.data.splice(editedIndex, 1)

      else if(id && !removeFeedback)
        this.data[editedIndex] = data

      else 
        this.data.push({...data, id: parseInt(this.randomId())}), this.calculateTheNumberOfComments()
        
    },
    upVote(value, Id){
      let current = this.data.find(id => id.id === Id)
      current.upvotes = value
      this.data.sort((a,b) => b.upvotes - a.upvotes)
    },
    addComment(index, commentsIndex, replyingValue, textValue){
      const dataToPush = {user: {...this.currentUser}, id: parseInt(this.randomId()), replyingTo: replyingValue, content: textValue} 
      const replies = this.data[index].comments[commentsIndex]
      
         if( commentsIndex === undefined)
          this.data[index].comments.push(dataToPush)

         else 
          if(replies.replies)
            replies.replies.push(dataToPush)
            else
            replies.replies = [dataToPush]   

      this.calculateTheNumberOfComments()      
    },
    removeComment(index, commentsIndex, repliesIndex){
      repliesIndex !== undefined ? this.data[index].comments[commentsIndex].replies.splice(repliesIndex, 1) : this.data[index].comments.splice(commentsIndex, 1)
      this.calculateTheNumberOfComments()
    }
  }
})
