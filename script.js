// 等待页面完全加载后再执行脚本
document.addEventListener('DOMContentLoaded', function() {
  // 1. 分类切换功能
  const categoryLinks = document.querySelectorAll('.categories a');
  const categorySections = document.querySelectorAll('.category-section');
  
  // 为每个分类链接添加点击事件
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // 阻止默认的锚点跳转行为
      
      // 移除所有链接的active类
      categoryLinks.forEach(l => l.classList.remove('active'));
      // 为当前点击的链接添加active类
      this.classList.add('active');
      
      // 隐藏所有分类内容
      categorySections.forEach(section => section.classList.remove('active'));
      // 显示目标分类内容
      const targetId = this.getAttribute('href').substring(1); // 获取href值并去掉#
      document.getElementById(targetId).classList.add('active');
    });
  });
  
  // 2. 搜索功能
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  // 搜索函数
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // 如果搜索词为空，显示所有链接
    if (searchTerm === '') {
      document.querySelectorAll('.link-card').forEach(card => {
        card.style.display = 'block';
      });
      return;
    }
    
    // 遍历所有链接卡片
    document.querySelectorAll('.link-card').forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      
      // 检查标题或描述是否包含搜索词
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'block'; // 匹配则显示
      } else {
        card.style.display = 'none';  // 不匹配则隐藏
      }
    });
  }
  
  // 为搜索按钮添加点击事件
  searchBtn.addEventListener('click', performSearch);
  
  // 为搜索输入框添加回车键事件
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
  
  // 3. 初始化 - 默认显示第一个分类
  document.querySelector('.categories a').click();
});