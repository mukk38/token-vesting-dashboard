import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";

const vestingAbi = [
  "function claimableAmount(address) view returns (uint256)",
  "function claim()",
];

const vestingAddress = "0xYourVestingContractAddress";

export default function Vesting() {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [claimable, setClaimable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address || !signer) {
      setClaimable(null);
      return;
    }
    const contract = new ethers.Contract(vestingAddress, vestingAbi, signer);

    async function fetchClaimable() {
      try {
        const amount = await contract.claimableAmount(address);
        setClaimable(ethers.utils.formatEther(amount));
      } catch {
        setClaimable(null);
      }
    }

    fetchClaimable();
  }, [address, signer]);

  async function claimTokens() {
    if (!signer) return;
    setLoading(true);
    try {
      const contract = new ethers.Contract(vestingAddress, vestingAbi, signer);
      const tx = await contract.claim();
      await tx.wait();
      alert("Tokenlar başarıyla claim edildi!");
      const amount = await contract.claimableAmount(address);
      setClaimable(ethers.utils.formatEther(amount));
    } catch (e) {
      alert("Claim başarısız: " + e.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Vesting Dashboard</h2>
      <p>Cüzdan: {address ?? "Bağlı değil"}</p>
      <p>
        Claimable Token:{" "}
        {claimable === null ? "Yükleniyor..." : claimable === "0" ? "0" : claimable}
      </p>
      <button onClick={claimTokens} disabled={loading || claimable === "0" || !claimable}>
        {loading ? "Claim Ediliyor..." : "Claim Et"}
      </button>
    </div>
  );
}
