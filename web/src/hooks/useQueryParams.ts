"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useQueryParams<T>(): {
  queryParams: Partial<T>;
  setQueryParams: (params: Partial<T>, strict?: boolean) => void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = useMemo((): Partial<T> => {
    const params: Partial<T> = {};
    searchParams.forEach((value: string, key: string) => {
      params[key as unknown as keyof T] = value as T[keyof T];
    });

    return params;
  }, [searchParams]);

  const setQueryParams = useCallback(
    (params: Partial<T>, strict?: boolean) => {
      const urlSearchParams = strict
        ? new URLSearchParams()
        : new URLSearchParams(searchParams as unknown as URLSearchParams);
      Object.entries(params).forEach(([key, value]) => {
        urlSearchParams.set(key, String(value));
      });

      const search = urlSearchParams.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    [searchParams, pathname, router]
  );

  return { queryParams, setQueryParams };
}
