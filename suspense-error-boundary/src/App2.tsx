// 学习npm install jotai

import { atom, useAtom } from "jotai";
import { Suspense } from "react";

const userAtom = atom(async (get) => {
  const userId = 1;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`
  );
  return response.json();
});

const UserName = () => {
  const [user] = useAtom(userAtom);
  return <div>User name: {user.name}</div>;
};

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <UserName />
    </Suspense>
  );
}
