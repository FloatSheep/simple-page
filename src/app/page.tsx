"use client";

import { Card, Link, makeStyles } from "@fluentui/react-components";
import { CacheManager } from "@floatsheep/cachemanager";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, ReactElement } from "react";
import MessageComponent, { MessageBarHandle } from "@/components/messageBar";

const theStyles = makeStyles({
  card: {
    display: "grid",
    padding: "20px",
    margin: "10px auto 0",
    borderRadius: "10px",
  },
});

export default function Home() {
  const [dynamicContent, setDynamicContent] = useState<ReactElement | null>(
    null
  );
  const messageBar = useRef<MessageBarHandle>(null);
  const styles = theStyles();

  const route = useRouter();
  const cacheManager = new CacheManager({
    cachePrefix: "Application",
    cacheNamespace: "Global",
    broadId: "Login",
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      await cacheManager.init();
      if (!(await cacheManager.getItem("login"))) {
        messageBar.current?.addMessage(
          "提示",
          "未登录，正在跳转至登录页",
          "info"
        );
        setTimeout(() => {
          route.push("/login");
        }, 3000);
      } else {
        setDynamicContent(
          <>
            <Card className={styles.card}>
              <div className="pl-3 pr-3 flex flex-col items-start">
                <p className="text-3xl text-center">
                  一个使用 Next.js 构建的简单的页面
                </p>
                <br />
                <p className="text-2xl">本项目使用了：</p>
                <br />
                <li>
                  <Link href="https://nextjs.org" inline target="_blank">
                    Next.js
                  </Link>{" "}
                  作为脚手架
                </li>
                <li>
                  <Link
                    href="https://react.fluentui.dev"
                    inline
                    target="_blank"
                  >
                    Fluent UI React v9
                  </Link>{" "}
                  作为 UI 组件库
                </li>
                <li>
                  <Link
                    href="https://github.com/FloatSheep/cacheManager"
                    inline
                    target="_blank"
                  >
                    cacheManager
                  </Link>{" "}
                  作为持久化储存管理器
                </li>
                <br />
                <p className="text-center text-xs text-gray-500 justify-center flex">
                  Made by FloatSheep with ❤
                </p>
              </div>
            </Card>
          </>
        );
      }
    };

    checkLoginStatus();
  });

  return (
    <>
      <MessageComponent ref={messageBar} />
      <div className="w-[100%] grid fixed translate-y-[-50%] top-[50%] will-change-transform">
        {dynamicContent}
      </div>
    </>
  );
}
