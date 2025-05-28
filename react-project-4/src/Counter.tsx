import React, { useState } from "react";

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>카운터: {count}</h2>
            <button onClick={() => setCount(count + 1)}>증가</button>
            <button onClick={() => setCount(count - 1)}>감소</button>
        </div>
    );
};

export default Counter;
