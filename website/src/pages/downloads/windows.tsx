import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type { SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import TailWindThemeSelector from '@site/src/components/TailWindThemeSelector';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrosoft, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faPaste, faTerminal } from '@fortawesome/free-solid-svg-icons';

async function grabfilenameforWindows(
  setDownloadData: React.Dispatch<SetStateAction<{ version: string; binary: string; setup: string }>>,
): Promise<void> {
  const result = await fetch('https://api.github.com/repos/containers/podman-desktop/releases/latest');
  const jsonContent = await result.json();
  const assets = jsonContent.assets;
  const windowsSetupAssets = assets.filter(
    asset => (asset.name as string).endsWith('-setup.exe') && !asset.name.includes('airgap'),
  );
  if (windowsSetupAssets.length !== 1) {
    throw new Error('Unable to grab setup.exe');
  }
  const windowsSetupAsset = windowsSetupAssets[0];

  const binaryOnlyWindowsAssets = assets.filter(
    asset =>
      (asset.name as string).endsWith('.exe') &&
      !asset.name.includes('airgap') &&
      asset.name !== windowsSetupAsset.name,
  );
  const binaryAsset = binaryOnlyWindowsAssets[0];

  /* Find Windows installer for restricted environment */
  const windowsAirgapSetupAssets = assets.filter(
    asset =>
      (asset.name as string).endsWith('-setup.exe') &&
      asset.name.includes('airgap') &&
      asset.name !== windowsSetupAsset.name,
  );
  const windowsAirgapSetupAsset = windowsAirgapSetupAssets[0];

  const data = {
    version: jsonContent.name,
    binary: binaryAsset.browser_download_url,
    setup: windowsSetupAsset.browser_download_url,
    airgapsetup: windowsAirgapSetupAsset.browser_download_url,
  };
  setDownloadData(data);
}

export function WindowsDownloads(): JSX.Element {
  const [downloadData, setDownloadData] = useState({
    version: '',
    binary: '',
    setup: '',
  });

  const copyCliInstructions = () => {
    navigator.clipboard.writeText('winget install -e --id RedHat.Podman-Desktop');
  };

  useEffect(() => {
    grabfilenameforWindows(setDownloadData);
  }, []);

  return (
    <div className="basis-1/3 py-2 rounded-lg dark:text-gray-300 text-gray-700  bg-zinc-300/25 dark:bg-zinc-700/25 bg-blend-multiply text-center items-center">
      <FontAwesomeIcon size="4x" icon={faWindows} className="my-4" />
      <h2 className="w-full text-center text-4xl title-font font-medium pb-3 border-purple-600 border-b-2">Windows</h2>
      <div className="flex p-1 flex-col md:flex-col items-center align-top">
        <div className="flex flex-col align-middle items-center">
          <h3 className="mt-0">Podman Desktop for Windows</h3>
          <div className="pt-8">
            <Link
              className="mt-auto no-underline hover:no-underline inline-flex text-white hover:text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-md font-semibold"
              to={downloadData.setup}>
              <FontAwesomeIcon size="1x" icon={faDownload} className="mr-2" />
              Download Now
            </Link>
            <caption className="block w-full mt-1 text/50 dark:text-white/50">
              Windows installer, version {downloadData.version}
            </caption>
          </div>
          <div className="mt-4">
            <div>Other downloads for Windows:</div>
            <Link
              className="underline inline-flex dark:text-white text-purple-600 hover:text-purple-300 py-2 px-6 font-semibold text-md"
              to={downloadData.binary}>
              <FontAwesomeIcon size="1x" icon={faDownload} className="mr-2" />
              Windows portable executable
            </Link>
            <Link
              className="underline inline-flex dark:text-white text-purple-600 hover:text-purple-300 py-2 px-6 font-semibold text-md"
              to={downloadData.airgapsetup}>
              <FontAwesomeIcon size="1x" icon={faDownload} className="mr-2" />
              Windows installer for restricted environments
            </Link>
            <Link
              className="underline inline-flex dark:text-white text-purple-600 hover:text-purple-300 py-2 px-6 font-semibold text-md"
              to="/docs/Installation/windows-install">
              <FontAwesomeIcon size="1x" icon={faWindows} className="mr-2" />
              Package Managers Guide
            </Link>
          </div>
          <div className="flex flex-col align-middle items-center">
            <div className="items-center text-center pt-6">
              <p className="text-lg">
                Using <strong>winget</strong>? Install in one command:
              </p>
              <div className="flex flex-row pt-3">
                <p className="text-xl p-1">
                  <FontAwesomeIcon size="sm" icon={faMicrosoft} className="mx-1 mt-2" />
                </p>
                <div className="dark:bg-zinc-900/50 bg-zinc-300/50 p-1 text-xl dark:text-purple-300 text-purple-700 flex flex-row">
                  <div className="w-72 truncate">
                    <FontAwesomeIcon size="xs" icon={faTerminal} className="mx-2 mt-3" />
                    winget install -e --id RedHat.Podman-Desktop
                  </div>
                  <div>
                    <button title="Copy To Clipboard" className="mr-2 p-1">
                      {' '}
                      <FontAwesomeIcon
                        size="xs"
                        icon={faPaste}
                        className="ml-3  cursor-pointer text-xl  text-white-500"
                        onClick={() => copyCliInstructions()}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="Downloads for Windows">
      <TailWindThemeSelector />
      <section className="container mx-auto flex justify-center flex-col">
        <div className="w-full flex flex-col">
          <h1 className="title-font sm:text-3xl text-2xl lg:text-5xl mb-10 font-medium text-gray-900 dark:text-white">
            Windows Downloads
          </h1>
          <main className="h-screen">
            <WindowsDownloads />
          </main>
        </div>
      </section>
    </Layout>
  );
}
