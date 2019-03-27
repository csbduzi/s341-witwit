jest.dontMock('../server')
const nock = require('nock')
jest.mock('../server',()=>mock)



/*
 * CORE FEATURE I - POST A WIT
 * Test cases: 
 * Post an empty Wit
 * Post a long Wit
 * Delete another users Wit
*/

describe("testing post a wit",()=> {
  it("Can add a wit",function() {
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postWit')
    .reply(200, {
      post: {
        wit: "Hellp people",
        userLoggedIN : 'Hampic'
      }})
  })
  it("Cannot add a long wit",function() {
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postWit')
    .reply(400, {
      post: {
        wit:"Hello everyoneasnkdasj pasnfjasn [fpojasognasjasnfk as]fpjasof jasfaskj fasnknfkoasnf koasnf ko[sanf [soan fo[sna foas[fa fnasogn aso nafsoknfjsnvpoxkn oska[nasoks[oskacn oas[k sacn aso[asgksns o[cnas[ocoasn[o"+
        "asdasdasdasdasdsa",
        userLoggedIN: "Hampic"
      }
    })
  })
  it("Can not delete other people's wits", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(400, {
      witInfo: {
        username:"Hampic",
        userLoggedIN: "Hampic"
      }
  })
  })
  it("Get the list of likes for a wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeLists.js/witLikesList')
    .reply(200, {
      replyListInfo: {
        wit_id: 5
      }
    })
  })
  it("Delet my own wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(200,{
      witInfo: {username: "Hampic",
    wit_id: 24}
    })
  })
  it("Can't delete a wit twice", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(200,{
      witInfo: {username: "Hampic",
    wit_id: 24}
    })
    scope.post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(400,{
      witInfo: {username: "Hampic",
    wit_id: 24}
    })
  })
  it("Cannot post an empty wit",function() {
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postWit')
    .reply(401, {
      post: {
        wit:"",
        userLoggedIN: "Hampic"
      }
    })
  })
  })

/*
 * CORE FEATURE II - LIKE A WIT
 * Test cases: 
 * Like a wit
 * Like a wit twice
 * See all the wits I liked
*/

describe("testing like a wit", ()=> {
  //Liking your own wit
  it("Can't like their own wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit')
    .reply(401, {
      witObject: {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
  })
  it("Can't like a wit twice", function(){
    //Liking a wit twice
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit') //like one
    .reply(200, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit') //like two
    .reply(401, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
  })
  it("like a wit from following someone",function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit')
    .reply(200,{
      witInfo : {
        username: "Hampic",
        wit_id: 4
      }
    })
  })

  it("Can see all the wits user liked", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeList.js/witLikesList')
    .reply(200, {
      witObject: {
        userLoggedIN : 'daphne'
      }
    })
  })

    //like a wit of someone you are not following
    it("Can like a wit of someone the user is not following", function(){
      const scope = nock('http://localhost:3002')
      .post('/s341-witwit/server/routes/like/likeWits.js/likeWit')
      .reply(200, {           
        witObject: {        
          username : 'hussain',
          userLoggedIN : 'Alain',
          wit_id : '35'
        }
      }) 
    })
  
    //Unlike a wit
    it("Can unlike a wit", function(){
      const scope = nock('http://localhost:3002')
      .post('/s341-witwit/server/routes/like/likeWits.js/unlikeWit')
      .reply(401, {          
        witObject: {      
          username : 'hussain',
          userLoggedIN : 'Alain',
          wit_id : '35'
        }
      }) 
    })
})
/*
 * CORE FEATURE III - FOLLOW A USER
 * Test cases: 
 * Follow a user
 * Unfollow a user
 * Follow yourself
*/

describe("testing following", ()=>{
  //Follow another user
  it("Can follow another user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/follow/followUser.js/followUser')
    .reply(200, {
      witObject: {
        username : 'Hampic',
        userLoggedIN : 'Alain'
      }
    }) 
  })

  //Unfollow a user

  it("Can unfollow a user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/follow/followUser.js/followUser')
    .reply(200, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Alain'
      }
    })
  })

  //Following yourself

  it("Cannot follow yourself", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/follow/followUser.js/followUser')
    .reply(200, {
      witObject : {
        username : 'Alain',
        userLoggedIN : 'Alain'
      }
    })
  })
  it("retrieve the list of following",function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/follow/followingList.js/getListFollowing')
    .reply(200, {
      userInfo : {
        username: "karen"
      }
    })
  })
})



/*
 * CORE FEATURE ADDITIONAL - REPLY
 * Test cases: 
 * Reply to someone
*/
describe("testing reply", ()=>{
  //Reply to someone
  it("can reply to any wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postReply')
    .reply(200, {
      witObject: {
        wit_id : '35',
        userLoggedIN : 'Hampic',
        reply : 'Hey'
      }
    })
  })
  it("cannot post a very long reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postReply')
    .reply(400, {
      witObject: {
        wit_id : '35',
        wit:"Hello everyoneasnkdasj pasnfjasn [fpojasognasjasnfk as]fpjasof jasfaskj fasnknfkoasnf koasnf ko[sanf [soan fo[sna foas[fa fnasogn aso nafsoknfjsnvpoxkn oska[nasoks[oskacn oas[k sacn aso[asgksns o[cnas[ocoasn[o"+
        "asdasdasdasdasdsa",
        userLoggedIN: "Hampic"
      }
    })
  })
  it("cannot post an empty reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postReply')
    .reply(400, {
      witObject: {
        wit_id : '35',
        wit:"",
        userLoggedIN: "Hampic"
      }
    })
  })
})

/*
 * Test cases: 
 * Search bar
*/
describe("testing search engine", ()=>{

  it("search a user", function(){                  
    const scope = nock('http://localhost:3002')           
    .post('/s341-witwit/server/routes/main_pages/searchEngine.js/search')
    .reply(400, {          
      witObject: {        
        username : 'hampic',
        userLoggedIN : 'hussain'
      }
    }) 
  })

})

/*
 * Test cases: 
 * login/timeline/profile
*/
describe("testing login/timeline/profile", ()=>{

  it("logging in", function(){                
    const scope = nock('http://localhost:3002')           
    .post('/s341-witwit/server/routes/main_pages/login_register.js/login')
    .reply(401, {           
      witObject: {        
        username : 'hussain'
        
      }
    }) 
  })

  it("register", function(){                   
    const scope = nock('http://localhost:3002')             
    .post('/s341-witwit/server/routes/main_pages/login_register.js/register')
    .reply(200, {         
      witObject: {       
        username : 'hussain',
        email : 'hussain@live.com'
      }
    }) 
  })



  it("timeline", function(){                   
    const scope = nock('http://localhost:3002')             
    .post('/s341-witwit/server/routes/main_pages/timeline.js/timelineProfile')
    .reply(200, {        
      witObject: {       
        username : 'hussain',
        userLoggedIN: 'hussain'
      }
    }) 
  })

  it("profile", function(){                   
    const scope = nock('http://localhost:3002')             
    .post('/s341-witwit/server/routes/main_pages/profile.js/profile')
    .reply(400, {          
      witObject: {       
        userLoggedIN: 'hussain'
      }
    }) 
  })

})
