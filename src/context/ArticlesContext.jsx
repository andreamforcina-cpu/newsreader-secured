/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const { user, isAdmin } = useAuth();
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({});
  const getUserSavedArticles = () => user
    ? (savedArticlesByUser[user.username] ?? []) : [];
  const saveArticle = (article) => {
    if (!user) return;
    setSavedArticlesByUser(previous => {
      const articles = previous[user.username] ?? [];
      if (articles.some(a => a.url === article.url)) return previous;
      return { ...previous, [user.username]: [...articles, article] };
    });
  };
  const removeArticle = (url) => {
    if (!user) return;
    setSavedArticlesByUser(previous => ({ ...previous,
      [user.username]: (previous[user.username] ?? []).filter(a => a.url !== url),
    }));
  };
  const isArticleSaved = (url) => getUserSavedArticles().some(a => a.url === url);
  const getAllUserArticles = () => isAdmin() ? savedArticlesByUser : {};
  return <ArticlesContext.Provider value={{ saveArticle, removeArticle,
    isArticleSaved, getUserSavedArticles, getAllUserArticles }}>
    {children}
  </ArticlesContext.Provider>;
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) throw new Error('useArticles requires ArticlesProvider');
  return context;
}
