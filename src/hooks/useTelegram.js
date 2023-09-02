const tg = window.Telegram.WebApp;
export default function () {
  const onClose = () => {
    tg.close();
  };
  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };
  return { tg, user: tg.initDataUnsafe?.user, onClose, onToggleButton };
}
