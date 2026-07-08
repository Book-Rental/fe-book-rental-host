
declare global {
    interface Window {
        renderReactWidget?: (config: string) => void;
        unmountReactWidget?: (id: string) => void;
        HOST_USER_INFO: any;
    }
}