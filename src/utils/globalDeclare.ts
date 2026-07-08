
declare global {
    interface Window {
        renderReactWidget?: (config: string) => void;
        unmountReactWidget?: (id: string) => void;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        HOST_USER_INFO: any;
    }
}