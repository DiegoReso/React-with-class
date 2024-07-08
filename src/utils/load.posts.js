export const loadPosts = async () =>{
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] =  await Promise.all([postsResponse, photosResponse])

    const photosData = await photos.json()
    const postsData = await posts.json()

    const postAndPhotos = postsData.map((post,index) => {
      return {...post, cover: photosData[index].url}
    })
    
    return postAndPhotos
}