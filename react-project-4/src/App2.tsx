import {useState, useContext, createContext, JSX} from "react";

// Context 생성
const UserContext = createContext<{ count: string }>({ count: "" });

function App2(): JSX.Element {
    const [user, setUser] = useState<{ count: string }>({ count: "Hello Context" });

    return (
        <UserContext.Provider value={user}>
            <h1>App2</h1>
            <Component1 />
        </UserContext.Provider>
    );
}

function Component1(): JSX.Element {
    return (
        <>
            <h1>Component1</h1>
            <Component2 />
        </>
    );
}

function Component2(): JSX.Element {
    const user = useContext(UserContext);
    return (
        <>
            <h1>Component2</h1>
            <h2>{user.count}</h2> {/* count 필드에 접근 */}
        </>
    );
}

export default App2;
