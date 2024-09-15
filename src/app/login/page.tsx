"use client";

import {
  Card,
  makeStyles,
  Label,
  Input,
  Button,
  useId,
} from "@fluentui/react-components";
import { useRef } from "react";
import { CacheManager } from "@floatsheep/cachemanager";
import MessageComponent, { MessageBarHandle } from "@/components/messageBar";
import { useRouter } from "next/navigation";

const theStyles = makeStyles({
  card: {
    display: "grid",
    padding: "20px",
    margin: "10px auto 0",
    borderRadius: "10px",
  },
});

export default function Login() {
  const styles = theStyles();
  const router = useRouter();

  const idCollection = {
    username: useId("username"),
    password: useId("password"),
  };
  const refCollection = {
    username: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    messageBar: useRef<MessageBarHandle>(null),
  };

  const cacheManager = new CacheManager({
    cachePrefix: "Application",
    cacheNamespace: "Global",
    broadId: "Login",
  });

  const handleClick = async () => {
    if (
      !refCollection.username.current?.value ||
      !refCollection.password.current?.value
    ) {
      refCollection.messageBar.current?.addMessage(
        "错误",
        "用户名或密码为空",
        "error"
      );

      return;
    }
    refCollection.messageBar.current?.addMessage(
      "信息",
      `账号：${refCollection.username.current?.value}，密码：${refCollection.password.current?.value}`,
      "success"
    );
    refCollection.messageBar.current?.addMessage(
      "信息",
      `登录成功，正在跳转至首页！`,
      "success"
    );
    setTimeout(() => {
      router.push("/");
    }, 3000);
    await cacheManager.init();
    await cacheManager.setItem("login", true);
  };

  return (
    <>
      <MessageComponent ref={refCollection.messageBar} />
      <div className="w-[100%] grid fixed translate-y-[-50%] top-[50%] will-change-transform">
        <label className="font-bold text-2xl text-center leading-[1.5] text-[#616161]">
          登录
          <br />
          FloatSheepのAdmin
        </label>
        <Card className={styles.card}>
          <div className="login-line pl-3 pr-3 flex items-center">
            <Label size="medium" className="pr-3">
              用户名
            </Label>
            <Input
              aria-label="用户名"
              placeholder="用户名"
              id={idCollection.username}
              ref={refCollection.username}
            ></Input>
          </div>
          <div className="login-line pl-3 pr-3 flex items-center justify-between">
            <Label size="medium" className="pr-3">
              密码
            </Label>
            <Input
              type="password"
              aria-label="密码"
              placeholder="密码"
              id={idCollection.password}
              ref={refCollection.password}
            ></Input>
          </div>
          <Button appearance="primary" size="medium" onClick={handleClick}>
            登录！
          </Button>
        </Card>
      </div>
    </>
  );
}
