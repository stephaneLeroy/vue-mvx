import DefaultWalletLogo from "@/components/logos/DefaultWalletLogo";
import LedgerLogo from "@/components/logos/LedgerLogo";
import MaiarLogo from "@/components/logos/MaiarLogo";

const logos = new Map();
logos.set('Defi Wallet', DefaultWalletLogo);
logos.set('Web Wallet', DefaultWalletLogo);
logos.set('Ledger', LedgerLogo);
logos.set('xPortal', MaiarLogo);

export default logos;
