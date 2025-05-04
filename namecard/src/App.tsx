import { FaDiscord } from 'react-icons/fa6';
import discordUsersJson from '../discord-users.json';

const chunkWithPadding = <T,>(arr: T[], size: number): (T | null)[][] => {
  const result: (T | null)[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunk: (T | null)[] = arr.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    result.push(chunk);
  }
  return result;
}

const A4Paper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto">
      {children}
    </div>
  );
};

const App = () => {
  return (
    <>
      {chunkWithPadding(discordUsersJson.users, 4).map(membersChunk => (
        <A4Paper key={membersChunk[0]?.name}>
          <div className="grid grid-cols-2 grid-rows-[1fr_1fr] w-full h-full">
            {membersChunk.map(member => member ? (
              <div key={member.name} className="border box-border flex flex-col justify-center">
                {member.iconImageUrl.startsWith('https://canary.') ? (
                  <FaDiscord className="w-1/2 h-auto mx-auto mb-16" />
                ) : (
                  <img
                    src={member.iconImageUrl + '?size=1024'}
                    alt={member.name}
                    className="w-1/2 h-auto mx-auto rounded-full border-6 border-neutral-200 mb-16"
                  />
                )}
                <div className='text-center mb-4'>
                  <span className='text-3xl mr-1'>
                    {member.th}
                  </span>
                  <span className='text-xl'>
                    回生
                  </span>
                </div>
                <div className="text-center text-4xl font-extrabold mb-8">{member.name}</div>
              </div>
            ): <div className='shrink-0' />)}
          </div>
        </A4Paper>
      ))}
    </>
  );
};

export default App;
