var posts=["2025/10/05/hexo-setup/","2025/10/05/upload/","2025/10/05/provider/","2025/10/05/vercel/","2025/10/05/questions/","2025/10/05/qexo-bulid/","2025/10/05/hello-world/","2025/10/05/qexo/","2025/10/05/hexo-theme-Butterfly/","2025/10/05/hexo-theme-anzhiyu-install/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };