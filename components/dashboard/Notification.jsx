import { CircleDotIcon } from "lucide-react";

function NotificationDot({ visible, color, amount }) {
  if (!color) color = "blue-500";

  if (amount > 9) amount = <CircleDotIcon />;

  if (visible) {
    return (
      <div
        className={`w-6 h-6 text-xs font-bold flex items-center justify-center aspect-square rounded-full p-1 bg-${color}`}
      >
        {amount}
      </div>
    );
  }
}

export default NotificationDot;
