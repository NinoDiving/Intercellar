import { wagmiContractConfig } from "@/services/contract/contractConfig";
import useRead from "@/services/contract/read";

export default function ReadContract() {
  const { balance, error, isError, isLoading } = useRead();

  return (
    <article>
      <h2>Smart Contract</h2>
      <div>
        <p>Adresse du contrat: {wagmiContractConfig.address}</p>
        {isLoading ? (
          <p>Chargement...</p>
        ) : isError ? (
          <p>Erreur: {error?.message}</p>
        ) : (
          <p>Valeur actuelle: {balance?.toString()}</p>
        )}
      </div>
    </article>
  );
}
