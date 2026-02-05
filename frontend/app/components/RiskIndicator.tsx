type RiskLevel = "safe" | "suspicious" | "danger";

interface RiskIndicatorProps {
  risk: RiskLevel;
  score: number;
}

export default function RiskIndicator({ risk, score }: RiskIndicatorProps) {
  const getRiskConfig = (risk: RiskLevel) => {
    switch (risk) {
      case "safe":
        return {
          bg: "bg-green-100 dark:bg-green-900",
          border: "border-green-500",
          text: "text-green-800 dark:text-green-200",
          icon: "✓",
          label: "SAFE",
          message: "This looks legitimate"
        };
      case "suspicious":
        return {
          bg: "bg-orange-100 dark:bg-orange-900",
          border: "border-orange-500",
          text: "text-orange-800 dark:text-orange-200",
          icon: "⚠",
          label: "SUSPICIOUS",
          message: "Be cautious - some red flags detected"
        };
      case "danger":
        return {
          bg: "bg-red-100 dark:bg-red-900",
          border: "border-red-500",
          text: "text-red-800 dark:text-red-200",
          icon: "✕",
          label: "DANGER",
          message: "This is likely a scam - do not proceed"
        };
    }
  };

  const config = getRiskConfig(risk);

  return (
    <div className={`${config.bg} ${config.text} border-4 ${config.border} rounded-2xl p-8 text-center`}>
      <div className="text-7xl mb-4">{config.icon}</div>
      <h2 className="text-4xl font-bold mb-2">{config.label}</h2>
      <p className="text-2xl mb-4">{config.message}</p>
      <div className="text-xl">
        <span className="font-semibold">Risk Score: </span>
        <span className="text-3xl font-bold">{score}/100</span>
      </div>
    </div>
  );
}
