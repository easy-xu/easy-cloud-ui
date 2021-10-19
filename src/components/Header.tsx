import React, { useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';

const { Item, SubMenu } = Menu;

const Header: React.FC<{
  dataSource?: any;
  isMobile?: boolean;
  refresh?: any;
}> = ({ dataSource, isMobile, refresh }) => {
  const { location: any = {} } = typeof window !== 'undefined' ? window : {};
  const [isShow, setIsShow] = useState(!location.port);
  const [phoneOpen, setPhoneOpen] = useState(false);

  const phoneClick = () => {
    setPhoneOpen(!phoneOpen);
  };

  const navChildren = dataSource.Menu.children;

  useEffect(() => {
    console.log('refresh');
    setIsShow(false);
    setTimeout(() => {
      setPhoneOpen(true);
      setIsShow(true);
    }, 500);
  }, [refresh]);

  const moment = phoneOpen === undefined ? 300 : null;
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
                    onComplete: (e) => {
                      if (phoneOpen) {
                        e.target.style.height = '100%';
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : {
                    x: 30,
                    type: 'from',
                    ease: 'easeOutQuad',
                  }
            }
            moment={moment}
            reverse={!!phoneOpen}
            resetStyle={true}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['index']}
              theme="dark"
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
