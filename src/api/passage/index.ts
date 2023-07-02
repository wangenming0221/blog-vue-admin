import { Result, PageResult } from "@/model";
import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { ArticleQuery, Article } from "./types";
/**
 * 用户登录
 * @param data 登录信息
 * @returns Token
 */

  export function getArticleList(params: ArticleQuery): AxiosPromise<Result<PageResult<Article[]>>> {
    return request({
      url: "/article/articleList",
      method: "get",
      params,
    });
  }