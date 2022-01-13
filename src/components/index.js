import VueErdjsConnect from "./VueErdjsConnect";
import MaiarLogin from './maiar/MaiarLogin';
import LedgerLogin from './ledger/LedgerLogin';
import WebWalletLogin from './web/WebWalletLogin';
import DefiWalletLogin from './defi/DefiWalletLogin';
import WebWalletCallback from './web/WebWalletCallback';

export { VueErdjsConnect };
export default [VueErdjsConnect, MaiarLogin, LedgerLogin, WebWalletLogin, DefiWalletLogin, WebWalletCallback];
