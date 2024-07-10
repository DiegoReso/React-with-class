
import './Home.css'
import {Component} from 'react'
import { PostCard } from '../../components/PostCard'
import { loadPosts } from '../../utils/load.posts'
import { Button } from './Button'

export class Home extends Component{

  constructor(props){
    super(props)
   
      this.state = {
        posts: [],
        allPosts: [],
        page:0,
        postsPerPage: 2,
        searchValue: ''
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


  async componentDidMount(){
    await this.loadPosts()
  }

  loadPosts = async ()=>{
    const {page, postsPerPage} = this.state

    const postAndPhotos = await loadPosts()
    this.setState({
      posts: postAndPhotos.slice(page,postsPerPage),
      allPosts: postAndPhotos,
    })
    
  }

  loadMorePosts = () =>{
    const {page, postsPerPage, allPosts,posts} = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    this.setState({posts, page: nextPage})

  }


  handleChange = (e) =>{
    const {value} = e.target
    this.setState({searchValue: value})
    console.log(e.target)
  }
  
  render(){
   
    const {posts,searchValue} = this.state
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    
    return (
      <section className='container'> 
      {searchValue && (
        <h1>Search Value: {searchValue} </h1>
      )}
      
      <input 
        placeholder='Pesquisar post'
        onChange={this.handleChange}
        value={searchValue}
        type="search" 
        />  
      <br/> <br/> <br/>
        <div className="posts">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post}/>
          ))}
        </div>
        <Button
          text="Mais Posts"
          onClick={this.loadMorePosts}
          />
      </section>
    )
  }
}


