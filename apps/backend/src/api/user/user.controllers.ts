interface IViewsByDate {
  today: number;
  week: { total: number; xAxis: string[]; yAxis: number[] };
  month: { total: number; xAxis: string[]; yAxis: number[] };
  year: { total: number; xAxis: string[]; yAxis: number[] };
}

export interface IStatsResponseData {
  totalNumbers: { total_number_of_likes: number; total_number_of_comments: number; total_number_of_views: number };
  viewsByDate: IViewsByDate;
  statsPerBlog: {
    blogId: string;
    title: string;
    total_number_of_likes: number;
    total_number_of_comments: number;
    total_number_of_views: number;
  }[];
}

import { Request, Response } from 'express';
import { getUserById_dao, getUserStats_dao } from './user.dao';
import dayjs from 'dayjs';

export const getMe_controller = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const user = await getUserById_dao(userId);
  res.status(200).json({ success: true, user });
};

export const getUserStats_controller = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const stats = await getUserStats_dao(userId);
  const totalNumbers = { total_number_of_likes: 0, total_number_of_comments: 0, total_number_of_views: 0 };
  //
  // TODO: Refactor this for charts data
  //
  const viewsByDate: IViewsByDate = {
    today: 0,
    week: { total: 0, xAxis: [], yAxis: [] },
    month: { total: 0, xAxis: [], yAxis: [] },
    year: { total: 0, xAxis: [], yAxis: [] },
  };
  const statsPerBlog: {
    blogId: string;
    title: string;
    total_number_of_likes: number;
    total_number_of_comments: number;
    total_number_of_views: number;
  }[] = [];
  const date = dayjs().format('YYYY-MM-DD');
  const weekBefore = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const tempLast30DaysObj: { [key: string]: number } = {};
  const tempLast12MonthsObj: { [key: string]: number } = {};
  const dateBefor30Days = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
  const last13Month = dayjs().subtract(13, 'month').format('YYYY-MM') + '-01';
  const todaysDate = dayjs().format('YYYY-MM-DD');
  stats.forEach(blog => {
    const perBlogStatsObj = { blogId: blog.id, title: blog.title, total_number_of_likes: 0, total_number_of_comments: 0, total_number_of_views: 0 };
    blog.blog_stats.forEach((stat, ind) => {
      if (dayjs(stat.date).isAfter(last13Month)) {
        const temp = dayjs(stat.date).format('YYYY-MM') + '-01';
        tempLast12MonthsObj[temp] = tempLast12MonthsObj[temp] ? tempLast12MonthsObj[temp] + stat.number_of_views : stat.number_of_views;
      }
      if (dayjs(stat.date).isAfter(dateBefor30Days)) {
        tempLast30DaysObj[stat.date] = tempLast30DaysObj[stat.date] ? tempLast30DaysObj[stat.date] + stat.number_of_views : stat.number_of_views;
      }
      if (stat.date === todaysDate) viewsByDate.today += stat.number_of_views;
      perBlogStatsObj.total_number_of_likes += stat.number_of_likes;
      perBlogStatsObj.total_number_of_comments += stat.number_of_comments;
      perBlogStatsObj.total_number_of_views += stat.number_of_views;
      if (stat.date === date) viewsByDate.today += stat.number_of_views;
      if (dayjs(stat.date).isAfter(weekBefore)) viewsByDate.week.total += stat.number_of_views;
      if (stat.date.split('-')[1] === date.split('-')[1]) viewsByDate.month.total += stat.number_of_views;
      if (stat.date.split('-')[0] === date.split('-')[0]) viewsByDate.year.total += stat.number_of_views;
      totalNumbers.total_number_of_likes += stat.number_of_likes;
      totalNumbers.total_number_of_comments += stat.number_of_comments;
      totalNumbers.total_number_of_views += stat.number_of_views;
    });
    statsPerBlog.push(perBlogStatsObj);
  });
  let monthXAxis = [];
  let monthYAxis = [];
  for (let key in tempLast30DaysObj) {
    monthXAxis.push(key);
    monthYAxis.push(tempLast30DaysObj[key]);
  }
  viewsByDate.week.xAxis = monthXAxis.slice(0, 7).reverse();
  viewsByDate.week.yAxis = monthYAxis.slice(0, 7).reverse();
  viewsByDate.month.xAxis = monthXAxis.reverse();
  viewsByDate.month.yAxis = monthYAxis.reverse();
  let yearXAxis = [];
  let yearYAxis = [];
  for (let key in tempLast12MonthsObj) {
    let month = dayjs(key).format('MMM-YYYY');
    yearXAxis.push(month);
    yearYAxis.push(tempLast12MonthsObj[key]);
  }
  viewsByDate.year.xAxis = yearXAxis.reverse();
  viewsByDate.year.yAxis = yearYAxis.reverse();
  res.status(200).json({ totalNumbers, viewsByDate, statsPerBlog });
};
