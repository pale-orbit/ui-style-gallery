import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, LayoutGrid, GitCompare, Github } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '风格橱窗', icon: LayoutGrid },
    { path: '/compare', label: '风格对比', icon: GitCompare },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Palette className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">UI 风格橱窗</h1>
              <p className="text-xs text-gray-500">Style Gallery</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-violet-50 text-violet-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
