import logo from './logo.svg';
import './App.css';
import {Component} from 'react'

class App extends Component{

  constructor(props){
    super(props)
   
      this.state = {
        posts: []
      }
  }

  handlePClick = () =>{
    this.setState({name: 'Diego Alterado'})
  }

  handleAClick = (e) =>{
    e.preventDefault()
    const {counter} = this.state
    this.setState({counter: counter + 1})
    console.log(counter)
  }


  componentDidMount(){
    this.loadPosts()
  }

  loadPosts = async ()=>{
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] =  await Promise.all([postsResponse, photosResponse])

    const photosData = await photos.json()
    const postsData = await posts.json()

    const postAndPhotos = postsData.map((post,index) => {
      return {...post, cover: photosData[index].url}
    })

    this.setState({posts: postAndPhotos})
    
    
  }

  componentDidUpdate(){
   
  }

  componentWillUnmount(){
    
  }
  
  render(){
   
    const {posts} = this.state
    
    return (
      <section className='container'>
        <div className="posts">

            {posts.map(post => (
             <div className='post'>
              <img src={post.cover} alt={post.title} />
              <div className='post-content' key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
             </div>
              
              
            ) 
            )}
        
      </div>
      </section>
      
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
