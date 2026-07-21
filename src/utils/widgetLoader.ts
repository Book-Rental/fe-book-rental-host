

export const loadWidget = (
  url: string,
  containerId: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
  data?: Record<string, string>,
) => {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container "${containerId}" not found`);
    return;
  }

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      container.setAttribute(`data-${key}`, value);
    });
  }

  const script = document.createElement("script");
  script.src = url;
  script.async = true;

  script.onload = () => {
    window.renderReactWidget?.(
      JSON.stringify({
        containerElementId: containerId,
        ...params
      }),
    );
  };

  script.onerror = () => {
    console.error("Failed to load widget script");
  };

  document.body.appendChild(script);
};

export const removeWidget = (containerId: string) => {
  window.unmountReactWidget?.(containerId);
};
