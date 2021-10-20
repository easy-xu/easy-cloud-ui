import React, { useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';

const { Item, SubMenu } = Menu;

let refreshIng = false;

const Header: React.FC<{
  dataSource?: any;
  isMobile?: boolean;
  refresh: any[];
  menuSelectKey: string;
}> = ({ dataSource, isMobile, refresh, menuSelectKey }) => {
  const [isShow, setIsShow] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);

  const phoneClick = () => {
    if (isMobile) {
      setPhoneOpen(!phoneOpen);
    }
  };

  const navChildren = dataSource.Menu.children;

  const refreshMenu = () => {
    if (!refreshIng) {
      console.log('refresh');
      setIsShow(false);
      refreshIng = true;
      setTimeout(() => {
        setIsShow(true);
        console.log('refreshed');
        refreshIng = false;
      }, 500);
    }
  };

  useEffect(() => {
    setPhoneOpen(false);
    refreshMenu();
  }, [...refresh]);

  const moment = phoneOpen === false ? 300 : null;
  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...dataSource.wrapper}
    >
      <div
        {...dataSource.page}
        className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
      >
        <TweenOne
          animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
          {...dataSource.logo}
        >
          <img width="100%" src={dataSource.logo.children} alt="img" />
        </TweenOne>
        {isMobile && (
          <div
            {...dataSource.mobileMenu}
            onClick={() => {
              phoneClick();
            }}
          >
            <em />
            <em />
            <em />
          </div>
        )}
        {isShow && (
          <TweenOne
            {...dataSource.Menu}
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    ease: 'easeInOutQuad',
                  }
                : {
                    x: 30,
                    type: 'from',
                    ease: 'easeOutQuad',
                  }
            }
            moment={moment}
            reverse={phoneOpen}
            resetStyle={true}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              theme={'dark'}
              defaultSelectedKeys={[menuSelectKey]}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        )}
      </div>
    </TweenOne>
  );
};

export default Header;
