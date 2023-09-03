import { useEffect, useState } from 'react';
import { Console, Hook, Unhook } from 'console-feed';

const Terminal = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((curLogs) => [...curLogs, log] as never[]),
      false
    );
    return () => {
      Unhook(hookedConsole);
    };
  }, []);

  return <Console logs={logs} variant="dark"></Console>;
};

export { Terminal };
