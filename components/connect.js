import { useState } from "react";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { styled as muiStyled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useWeb3React } from '@web3-react/core';
import { abridgeAddress, injected, useENSName, walletConnect, walletlink } from '../pages/utils/_web3';
import ConnectModal from "./subcomponents/connectModal";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Connect() {
  const { activate, deactivate, active, account, library } = useWeb3React();
  const router = useRouter();

  // for the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const walletConnectConnector = walletConnect;
  const handleClose = () => setIsModalVisible(false);
  const handleConnect = () => {
    setIsModalVisible(true);
    handleMenuClose();
  };

  // for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBodyScroll = () => {
    document.body.style.overflow = 'visible';
  }

  const handleLoginClick = async (type) => {
    if (type === 'coinbase') {
      await activate(walletlink);
    } else if (type === 'metamask') {
      await activate(injected);
    } else {
      await activate(walletConnectConnector);
    }
    handleBodyScroll();
    handleClose();
  }

  const goToWallet = async () => {
    router.push('/community/wallet');
  }

  const handleDisconnect = async () => {
    await deactivate();
  }

  const ENSName = useENSName(library, account);

  return (
    <div>
    {!active ? (
      <CustomButton variant="contained"
        disableElevation
        onClick={handleConnect}
        >
          Connect Wallet
        </CustomButton>
        ) :
    <div>
      <Connected
        variant="contained"
        onClick={handleMenuClick}
        disableElevation
        endIcon={<KeyboardArrowDownIcon />}
      >
        {account && (ENSName || abridgeAddress(account))}
      </Connected>
      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          variant="contained"
          onClick={goToWallet}
          divider
        >
          Your wallet
        </MenuItem>
        <MenuItem
          variant="contained"
          onClick={handleDisconnect}
        >
          Disconnect
        </MenuItem>
      </CustomMenu>
    </div>
    }
    <ConnectModal
      isModalVisible={isModalVisible}
      handleLoginClick={handleLoginClick}
    />
    </ div>
  )
}

const CustomButton = muiStyled(Button)(({ theme }) => ({
  color: '#36ECAC',
  backgroundColor: '#236357',
  height: '45px',
  fontSize: '1.2rem',
  fontFamily: [
    'Space Mono,monospace',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
}));

const Connected = muiStyled(Button)(({ theme }) => ({
  color: '#36ECAC',
  backgroundColor: '#236357',
  height: '45px',
  fontSize: '1.1rem',
  padding: '1rem',
  textTransform: 'none',
  fontFamily: [
    'Space Mono,monospace',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
}));

const CustomMenu = muiStyled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(0.5),
    minWidth: 180,
    color: theme.palette.primary,
    background: theme.palette.primary.light,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

