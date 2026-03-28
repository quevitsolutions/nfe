const fs = require('fs');

const file = 'f:/GICLUB/webapp/src/lib/hooks/useContract.ts';
let content = fs.readFileSync(file, 'utf8');

// The file already includes useChainId for all AIPCORE queries, so we just need to ensure it's available and passed.
content = content.replace(/getRewardPoolAddress\(\)/g, "getRewardPoolAddress(useChainId())");

// Fix any nested useChainId() calls inside hooks that don't already have const chainId = useChainId() defined, 
// actually since Wagmi hooks can't safely call hooks inside args directly without breaking rules of hooks,
// let me fix it properly.

const replacements = [
{
  from: `export function useNodeInfo(userId: number) {
    return useReadContract({
        address: getRewardPoolAddress() as \`0x\${string}\`,`,
  to: `export function useNodeInfo(userId: number) {
    const chainId = useChainId();
    return useReadContract({
        address: getRewardPoolAddress(chainId) as \`0x\${string}\`,`
},
{
  from: `export function usePoolViewHelper(userId: number) {
    return useReadContract({
        address: getRewardPoolAddress() as \`0x\${string}\`,`,
  to: `export function usePoolViewHelper(userId: number) {
    const chainId = useChainId();
    return useReadContract({
        address: getRewardPoolAddress(chainId) as \`0x\${string}\`,`
},
{
  from: `export function usePoolRequirements() {
    const address = getRewardPoolAddress() as \`0x\${string}\`;`,
  to: `export function usePoolRequirements() {
    const chainId = useChainId();
    const address = getRewardPoolAddress(chainId) as \`0x\${string}\`;`
},
{
  from: `export function useContractInfo() {
    return useReadContract({
        address: getRewardPoolAddress() as \`0x\${string}\`,`,
  to: `export function useContractInfo() {
    const chainId = useChainId();
    return useReadContract({
        address: getRewardPoolAddress(chainId) as \`0x\${string}\`,`
},
{
  from: `export function useClaim() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const claim = async (userId: number) => {
        writeContract({
            address: getRewardPoolAddress() as \`0x\${string}\`,`,
  to: `export function useClaim() {
    const chainId = useChainId();
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const claim = async (userId: number) => {
        writeContract({
            address: getRewardPoolAddress(chainId) as \`0x\${string}\`,`
},
{
  from: `export function useQualificationStatus(userId: number) {
    return useReadContract({
        address: getRewardPoolAddress() as \`0x\${string}\`,`,
  to: `export function useQualificationStatus(userId: number) {
    const chainId = useChainId();
    return useReadContract({
        address: getRewardPoolAddress(chainId) as \`0x\${string}\`,`
},
{
  from: `export function useRegisterPoolNode() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const registerPoolNode = async (userId: number) => {
        writeContract({
            address: getRewardPoolAddress() as \`0x\${string}\`,`,
  to: `export function useRegisterPoolNode() {
    const chainId = useChainId();
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const registerPoolNode = async (userId: number) => {
        writeContract({
            address: getRewardPoolAddress(chainId) as \`0x\${string}\`,`
}
];

let finalContent = fs.readFileSync(file, 'utf8');
for (const rep of replacements) {
    finalContent = finalContent.replace(rep.from, rep.to);
}

fs.writeFileSync(file, finalContent);
console.log('useContract.ts fixed to use dynamic reward pool address based on chains.');
