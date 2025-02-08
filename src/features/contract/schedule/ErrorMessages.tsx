import { Txt } from "components/Txt";
import { colors } from "constants/colors";

export function ErrorMessages({ errors }: { errors: string[] }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        textAlign: "center",
      }}
    >
      <Txt color={colors.red} size="small" fontWeight="medium">
        {errors[0]}
      </Txt>
    </div>
  );
}
