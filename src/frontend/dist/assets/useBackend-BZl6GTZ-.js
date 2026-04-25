var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a, _client2, _currentResult2, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn2, _b;
import { m as Subscribable, p as pendingThenable, n as resolveEnabled, s as shallowEqualObjects, q as resolveStaleTime, t as noop, u as environmentManager, w as isValidTimeout, x as timeUntilStale, y as timeoutManager, z as focusManager, A as fetchState, B as replaceData, E as notifyManager, F as hashKey, G as getDefaultState, r as reactExports, H as shouldThrowError, I as useQueryClient } from "./index-Cnf9ohm-.js";
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var MutationObserver = (_b = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client2);
    __privateAdd(this, _currentResult2);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client2, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client2).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client2).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult2);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client2).getMutationCache().build(__privateGet(this, _client2), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client2 = new WeakMap(), _currentResult2 = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult2, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn2 = function(action) {
  notifyManager.batch(() => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult2).variables;
      const onMutateResult = __privateGet(this, _currentResult2).context;
      const context = {
        client: __privateGet(this, _client2),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b2 = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b2.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult2));
    });
  });
}, _b);
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b2, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b2 = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b2.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
const mockRides = [
  {
    id: "0000775",
    clientName: "Fernando Alves",
    driverName: "Carlos Mendes",
    origin: "Av. Paulista, 1500 - Bela Vista",
    destination: "Shopping Ibirapuera - Moema",
    status: "em_andamento",
    type: "corrida",
    fare: 38.5,
    distanceKm: 6.2,
    durationMinutes: 18,
    createdAt: Date.now() - 1e3 * 60 * 12,
    updatedAt: Date.now() - 1e3 * 60 * 5
  },
  {
    id: "0000776",
    clientName: "Beatriz Costa",
    driverName: "Ricardo Souza",
    origin: "Rua Augusta, 200 - Consolação",
    destination: "Aeroporto Congonhas",
    status: "a_caminho",
    type: "corrida",
    fare: 67,
    distanceKm: 12.4,
    durationMinutes: 35,
    createdAt: Date.now() - 1e3 * 60 * 8,
    updatedAt: Date.now() - 1e3 * 60 * 2
  },
  {
    id: "0000777",
    clientName: "Marcos Oliveira",
    driverName: "",
    origin: "Vila Madalena - Rua Mourato Coelho, 45",
    destination: "Pinheiros - Largo da Batata",
    status: "procurando",
    type: "corrida",
    fare: 22,
    distanceKm: 3.1,
    durationMinutes: 10,
    createdAt: Date.now() - 1e3 * 60 * 2,
    updatedAt: Date.now() - 1e3 * 60 * 1
  },
  {
    id: "0000778",
    clientName: "Juliana Ferreira",
    driverName: "",
    origin: "Moema - Av. Ibirapuera, 2907",
    destination: "Itaim Bibi - Rua Iguatemi, 192",
    status: "procurando",
    type: "entrega",
    fare: 31.25,
    distanceKm: 4.8,
    durationMinutes: 14,
    createdAt: Date.now() - 1e3 * 60 * 1,
    updatedAt: Date.now() - 1e3 * 30
  },
  {
    id: "0000779",
    clientName: "Paulo Rodrigues",
    driverName: "Antônio Lima",
    origin: "Centro - Praça da Sé",
    destination: "Lapa - Rua Guaicurus, 120",
    status: "concluida",
    type: "corrida",
    fare: 54.8,
    distanceKm: 9.6,
    durationMinutes: 28,
    createdAt: Date.now() - 1e3 * 60 * 45,
    updatedAt: Date.now() - 1e3 * 60 * 20
  },
  {
    id: "0000780",
    clientName: "Ana Luíza Santos",
    driverName: "Wagner Pereira",
    origin: "Santana - Av. Cruzeiro do Sul, 500",
    destination: "Tucuruvi - Shopping",
    status: "concluida",
    type: "corrida",
    fare: 19.5,
    distanceKm: 2.8,
    durationMinutes: 9,
    createdAt: Date.now() - 1e3 * 60 * 90,
    updatedAt: Date.now() - 1e3 * 60 * 75
  },
  {
    id: "0000781",
    clientName: "Roberto Nunes",
    driverName: "José Carlos",
    origin: "Brooklin - Rua Pequetita, 215",
    destination: "Campo Belo - Av. Vereador José Diniz",
    status: "cancelada",
    type: "entrega",
    fare: 28,
    distanceKm: 4.2,
    durationMinutes: 12,
    createdAt: Date.now() - 1e3 * 60 * 120,
    updatedAt: Date.now() - 1e3 * 60 * 115
  },
  {
    id: "0000782",
    clientName: "Camila Ribeiro",
    driverName: "Luiz Henrique",
    origin: "Jardins - Rua Oscar Freire, 800",
    destination: "Vila Olímpia - Shopping",
    status: "concluida",
    type: "corrida",
    fare: 42,
    distanceKm: 7.5,
    durationMinutes: 22,
    createdAt: Date.now() - 1e3 * 60 * 180,
    updatedAt: Date.now() - 1e3 * 60 * 160
  },
  {
    id: "0000783",
    clientName: "Thiago Machado",
    driverName: "Carlos Mendes",
    origin: "Tatuapé - Rua Tuiuti, 500",
    destination: "Penha - Av. Penha de França, 1200",
    status: "concluida",
    type: "corrida",
    fare: 24.5,
    distanceKm: 3.8,
    durationMinutes: 11,
    createdAt: Date.now() - 1e3 * 60 * 240,
    updatedAt: Date.now() - 1e3 * 60 * 225
  },
  {
    id: "0000784",
    clientName: "Larissa Gomes",
    driverName: "Ricardo Souza",
    origin: "Liberdade - Rua Galvão Bueno, 330",
    destination: "Saúde - Rua Domingos de Morais, 2200",
    status: "em_andamento",
    type: "corrida",
    fare: 33.75,
    distanceKm: 5.5,
    durationMinutes: 16,
    createdAt: Date.now() - 1e3 * 60 * 15,
    updatedAt: Date.now() - 1e3 * 60 * 8
  },
  {
    id: "0000785",
    clientName: "Eduardo Carvalho",
    driverName: "",
    origin: "Higienópolis - Av. Angélica, 2100",
    destination: "Perdizes - Rua Cardoso de Almeida, 700",
    status: "procurando",
    type: "entrega",
    fare: 18.5,
    distanceKm: 2.4,
    durationMinutes: 8,
    createdAt: Date.now() - 1e3 * 45,
    updatedAt: Date.now() - 1e3 * 20
  },
  {
    id: "0000786",
    clientName: "Fernanda Lima",
    driverName: "Antônio Lima",
    origin: "Bom Retiro - Rua José Paulino, 100",
    destination: "Brás - Rua Bresser, 1500",
    status: "a_caminho",
    type: "corrida",
    fare: 21,
    distanceKm: 3,
    durationMinutes: 9,
    createdAt: Date.now() - 1e3 * 60 * 6,
    updatedAt: Date.now() - 1e3 * 60 * 1
  },
  {
    id: "0000787",
    clientName: "Diego Monteiro",
    driverName: "Wagner Pereira",
    origin: "Cidade Jardim - Av. Europa, 600",
    destination: "Morumbi - Av. Morumbi, 8000",
    status: "concluida",
    type: "corrida",
    fare: 45.2,
    distanceKm: 8.1,
    durationMinutes: 24,
    createdAt: Date.now() - 1e3 * 60 * 300,
    updatedAt: Date.now() - 1e3 * 60 * 280
  },
  {
    id: "0000788",
    clientName: "Isabela Campos",
    driverName: "José Carlos",
    origin: "Santo André - Av. Industrial, 900",
    destination: "São Bernardo - Shopping",
    status: "concluida",
    type: "corrida",
    fare: 58.9,
    distanceKm: 11.2,
    durationMinutes: 32,
    createdAt: Date.now() - 1e3 * 60 * 360,
    updatedAt: Date.now() - 1e3 * 60 * 330
  },
  {
    id: "0000789",
    clientName: "Vitor Araújo",
    driverName: "Luiz Henrique",
    origin: "Copan - Av. Ipiranga, 200",
    destination: "República - Rua do Arouche, 300",
    status: "cancelada",
    type: "corrida",
    fare: 14,
    distanceKm: 1.5,
    durationMinutes: 6,
    createdAt: Date.now() - 1e3 * 60 * 420,
    updatedAt: Date.now() - 1e3 * 60 * 418
  }
];
const mockDrivers = [
  {
    id: "DRV001",
    name: "Carlos Mendes",
    phone: "(11) 99201-3344",
    vehicle: "Toyota Corolla",
    plate: "ABC-1234",
    rating: 4.9,
    totalRides: 842,
    status: "em_corrida",
    lat: -23.5613,
    lng: -46.6565,
    neighborhood: "Bela Vista",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 180
  },
  {
    id: "DRV002",
    name: "Ricardo Souza",
    phone: "(11) 98733-5566",
    vehicle: "Honda Civic",
    plate: "DEF-5678",
    rating: 4.8,
    totalRides: 634,
    status: "em_corrida",
    lat: -23.5477,
    lng: -46.6343,
    neighborhood: "Consolação",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 120
  },
  {
    id: "DRV003",
    name: "Antônio Lima",
    phone: "(11) 97822-7788",
    vehicle: "Chevrolet Onix",
    plate: "GHI-9012",
    rating: 4.7,
    totalRides: 389,
    status: "online",
    lat: -23.5505,
    lng: -46.6333,
    neighborhood: "Sé",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 90
  },
  {
    id: "DRV004",
    name: "Wagner Pereira",
    phone: "(11) 96744-9900",
    vehicle: "Volkswagen Polo",
    plate: "JKL-3456",
    rating: 4.6,
    totalRides: 512,
    status: "online",
    lat: -23.5745,
    lng: -46.6893,
    neighborhood: "Morumbi",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 150
  },
  {
    id: "DRV005",
    name: "José Carlos",
    phone: "(11) 95633-1122",
    vehicle: "Renault Kwid",
    plate: "MNO-7890",
    rating: 4.5,
    totalRides: 298,
    status: "offline",
    lat: -23.5901,
    lng: -46.6201,
    neighborhood: "Campo Belo",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 60
  },
  {
    id: "DRV006",
    name: "Luiz Henrique",
    phone: "(11) 94522-3344",
    vehicle: "Hyundai HB20",
    plate: "PQR-1234",
    rating: 4.8,
    totalRides: 721,
    status: "online",
    lat: -23.5631,
    lng: -46.6483,
    neighborhood: "Jardins",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 200
  },
  {
    id: "DRV007",
    name: "Robson Almeida",
    phone: "(11) 93411-5566",
    vehicle: "Ford Ka",
    plate: "STU-5678",
    rating: 4.4,
    totalRides: 175,
    status: "offline",
    lat: -23.5392,
    lng: -46.7141,
    neighborhood: "Lapa",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 30
  },
  {
    id: "DRV008",
    name: "Alexandre Santos",
    phone: "(11) 92300-7788",
    vehicle: "Fiat Argo",
    plate: "VWX-9012",
    rating: 4.7,
    totalRides: 446,
    status: "online",
    lat: -23.5199,
    lng: -46.6033,
    neighborhood: "Santana",
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 100
  }
];
const mockUsers = [
  {
    id: "USR001",
    name: "Fernando Alves",
    email: "fernando.alves@gmail.com",
    phone: "(11) 99100-2233",
    totalRides: 47,
    totalSpent: 1820.5,
    rating: 4.9,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 210,
    neighborhood: "Bela Vista"
  },
  {
    id: "USR002",
    name: "Beatriz Costa",
    email: "bia.costa@hotmail.com",
    phone: "(11) 98200-4455",
    totalRides: 23,
    totalSpent: 945.2,
    rating: 4.8,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 90,
    neighborhood: "Consolação"
  },
  {
    id: "USR003",
    name: "Marcos Oliveira",
    email: "marcos.oli@outlook.com",
    phone: "(11) 97300-6677",
    totalRides: 12,
    totalSpent: 398,
    rating: 4.5,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 45,
    neighborhood: "Vila Madalena"
  },
  {
    id: "USR004",
    name: "Juliana Ferreira",
    email: "juliana.f@gmail.com",
    phone: "(11) 96400-8899",
    totalRides: 68,
    totalSpent: 2730.4,
    rating: 4.9,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 365,
    neighborhood: "Moema"
  },
  {
    id: "USR005",
    name: "Paulo Rodrigues",
    email: "paulo.rod@gmail.com",
    phone: "(11) 95500-0011",
    totalRides: 8,
    totalSpent: 284.5,
    rating: 4.3,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 20,
    neighborhood: "Centro"
  },
  {
    id: "USR006",
    name: "Ana Luíza Santos",
    email: "analuiza.s@yahoo.com",
    phone: "(11) 94600-2233",
    totalRides: 31,
    totalSpent: 1105.9,
    rating: 4.7,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 130,
    neighborhood: "Santana"
  },
  {
    id: "USR007",
    name: "Roberto Nunes",
    email: "rob.nunes@gmail.com",
    phone: "(11) 93700-4455",
    totalRides: 5,
    totalSpent: 142,
    rating: 3.8,
    blocked: true,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 15,
    neighborhood: "Brooklin"
  },
  {
    id: "USR008",
    name: "Camila Ribeiro",
    email: "camila.r@gmail.com",
    phone: "(11) 92800-6677",
    totalRides: 92,
    totalSpent: 3641.8,
    rating: 5,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 500,
    neighborhood: "Jardins"
  },
  {
    id: "USR009",
    name: "Thiago Machado",
    email: "thiago.m@outlook.com",
    phone: "(11) 91900-8899",
    totalRides: 19,
    totalSpent: 687.3,
    rating: 4.6,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 70,
    neighborhood: "Tatuapé"
  },
  {
    id: "USR010",
    name: "Larissa Gomes",
    email: "larissa.g@gmail.com",
    phone: "(11) 90000-0011",
    totalRides: 54,
    totalSpent: 2198.6,
    rating: 4.8,
    blocked: false,
    joinedAt: Date.now() - 1e3 * 60 * 60 * 24 * 280,
    neighborhood: "Liberdade"
  }
];
const mockDashboardStats = {
  activeRides: 5,
  driversOnline: 5,
  driversAvailable: 3,
  todayRevenue: 1250.8,
  avgResponseMinutes: 4.2,
  statusBreakdown: {
    procurando: 3,
    a_caminho: 2,
    em_andamento: 2,
    concluida: 6,
    cancelada: 2
  },
  recentAlerts: [
    {
      id: "ALR001",
      message: "Motorista Carlos Mendes finalizou corrida #0000779 com sucesso.",
      timestamp: Date.now() - 1e3 * 60 * 18,
      severity: "info"
    },
    {
      id: "ALR002",
      message: "Usuário Roberto Nunes foi bloqueado por comportamento inadequado.",
      timestamp: Date.now() - 1e3 * 60 * 45,
      severity: "warning"
    },
    {
      id: "ALR003",
      message: "Tempo médio de espera subiu para 4.2 min — monitorar demanda.",
      timestamp: Date.now() - 1e3 * 60 * 75,
      severity: "warning"
    },
    {
      id: "ALR004",
      message: "Nova corrida solicitada em Moema — procurando motorista próximo.",
      timestamp: Date.now() - 1e3 * 60 * 3,
      severity: "info"
    }
  ]
};
const mockSettings = {
  baseFare: 5,
  perKmRate: 2.5,
  perMinuteRate: 0.5,
  serviceFeePercent: 15,
  minFare: 7,
  platformCommission: 20,
  searchRadiusKm: 6,
  acceptanceTimeoutSec: 30,
  cancellationFeePercent: 10,
  scheduledRide: true,
  shareRoute: true,
  multipleDestinations: false,
  showFareBeforeAccept: true,
  maintenanceMode: false
};
const POLL_INTERVAL = 4e3;
function useRides() {
  return useQuery({
    queryKey: ["rides"],
    queryFn: async () => mockRides,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0
  });
}
function useDrivers() {
  return useQuery({
    queryKey: ["drivers"],
    queryFn: async () => mockDrivers,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0
  });
}
function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => mockUsers,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0
  });
}
function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => mockDashboardStats,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0
  });
}
function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => mockSettings,
    staleTime: 3e4
  });
}
function useToggleDriverOnline() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      driverId,
      online
    }) => {
      return { driverId, online };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["drivers"] });
    }
  });
}
function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings) => {
      return settings;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
    }
  });
}
export {
  useRides as a,
  useUsers as b,
  useDrivers as c,
  useToggleDriverOnline as d,
  useSettings as e,
  useUpdateSettings as f,
  useDashboardStats as u
};
