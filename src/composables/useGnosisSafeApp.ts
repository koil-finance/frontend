import { onBeforeMount } from 'vue';
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';
import useWeb3 from '@/services/web3/useWeb3';
import { tryPromiseWithTimeout } from '@/lib/utils/promise';

const isGnosisSafeApp = async (): Promise<boolean> => {
  // Can't be a Safe app if we're not running in an iframe
  if (window.self === window.top) return false;

  // Try to connect to the Gnosis UI by querying Safe info
  // If we get no response then we're not in a Safe app
  try {
    await tryPromiseWithTimeout(new SafeAppsSDK().safe.getInfo(), 1000);
    return true;
  } catch {
    return false;
  }
};

export default function useGnosisSafeApp() {
  const { connectWallet } = useWeb3();

  onBeforeMount(async () => {
    // If we're running as a Safe App we want to automatically
    // connect to the provided safe.
    if (await isGnosisSafeApp()) {
      await connectWallet('gnosis');
    }
  });
}
