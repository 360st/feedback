import { data } from 'autoprefixer'
import { defineStore } from 'pinia'
import Data from '../data.json'

const date = new Date()
const randomId = Math.floor(Math.random() * 10).toString() + date.getMinutes() + date.getSeconds() + date.getMilliseconds()


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
    }
  },
  actions: {
    loadData() {
      this.data = Data.productRequests.sort((a,b) => b.upvotes - a.upvotes)
      this.currentUser = Data.currentUser
      this.data.filter(e => e.comments === undefined).map(d => d.comments = [])
      console.log(this.data)
    },
    loadCategory() {
      this.categories = ["all", "UI", "UX", ...new Set(this.data.map(e => e.category))]
    },
    sortByNumbers(value) {
      this.valueOfSortByNumbers = value

      this.data.sort((a,b) => {
        if(this.valueOfSortByNumbers === "Most Comments")
          return b.comments.length - a.comments.length
  
        else if(this.valueOfSortByNumbers === "Least Comments")
          return a.comments.length - b.comments.length
  
        else if(this.valueOfSortByNumbers === "Least Upvotes") 
          return a.upvotes - b.upvotes
          
        else if(this.valueOfSortByNumbers === "Most Upvotes") 
          return b.upvotes - a.upvotes
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
        this.data.push({...data, id: parseInt(randomId)})
     
    },
    addComment(index, commentsIndex, replyingValue, textValue){
      const dataToPush = {user: {...this.currentUser}, id: parseInt(randomId), replyingTo: replyingValue, content: textValue} 
      const replies = this.data[index].comments[commentsIndex]
      
         if( commentsIndex === undefined)
          this.data[index].comments.push(dataToPush)

         else 
          if(replies.replies)
            replies.replies.push(dataToPush)
            else
            replies.replies = [dataToPush]
          
    },
    removeComment(index, commentsIndex, repliesIndex){
      repliesIndex !== undefined ? this.data[index].comments[commentsIndex].replies.splice(repliesIndex, 1) : this.data[index].comments.splice(commentsIndex, 1)
    }
  }
})
