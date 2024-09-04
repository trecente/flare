import { useAtom } from "jotai";

import { FilterOption } from "@/components/image-filter";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function FilterSwitch({ id, label, atom }: FilterOption) {
  const [checked, setChecked] = useAtom(atom);

  const handleToggle = () => setChecked((prev) => !prev);

  return (
    <Label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 text-sm font-medium"
    >
      <Switch id={id} checked={checked} onCheckedChange={handleToggle} />
      {label}
    </Label>
  );
}
