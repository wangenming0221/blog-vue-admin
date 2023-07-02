/**
 * 文章列表参数
 */
export interface ArticleQuery {
    /**
     * 每页条数
     */
    pageSize: Number;
    /**
     * 当前页数
     */
    current: Number
    /**
     * 标题
     */
    articleTitle: String
}

export interface Article {
    /**
   * 文章id
   */
  id: number;
  /**
   * 文章缩略图
   */
  articleCover: string;
  /**
   * 文章标题
   */
  articleTitle: string;
  /**
   * 文章类型 (1原创 2转载 3翻译)
   */
  articleType: number;
  /**
   * 是否置顶 (0否 1是)
   */
  isTop: number;
  /**
   * 是否推荐 (0否 1是)
   */
  isRecommend: number;
  /**
   * 是否删除 (0否 1是)
   */
  isDelete: number;
  /**
   * 状态 (1公开 2私密 3草稿)
   */
  status: number;
  /**
   * 文章分类名
   */
  categoryName: string;
  /**
   * 发表时间
   */
  createTime: string;
}