import { useEffect, useState } from 'react';
import { Console, Hook, Unhook } from 'console-feed';

const Terminal = ({ hackConsole }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (hackConsole) {
      const hookedConsole = Hook(
        hackConsole,
        (log) => setLogs((curLogs) => [...curLogs, log] as never[]),
        false
      );
      return () => {
        Unhook(hookedConsole);
      };
    }
  }, [hackConsole]);

  return (
    <>
      <Console styles={{ height: '25%' }} logs={logs} variant="dark"></Console>
    </>
  );
};

export { Terminal };
