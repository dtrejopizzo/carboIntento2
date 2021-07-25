import axios from 'axios';

export function getSendEstimatedValueAPI(params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/paths/strict-send`, { params }).then((res) => res.data._embedded.records[0]);
}

export function getReceiveEstimatedValueAPI(params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/paths/strict-receive`, { params }).then((res) => res.data._embedded.records[0]);
}

export function fetchAccountTokenList(address) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/accounts/${address}`)
    .then((res) => res.data.balances.map((item) => ({
      ...item,
      balance: item.balance,
    })));
}

export function fetchTradeAggregationAPI(baseAsset, counterAsset, params) {
  const assetParam = {};
  if (baseAsset.isNative()) {
    assetParam.base_asset_type = baseAsset.getAssetType();
  } else {
    assetParam.base_asset_type = baseAsset.getAssetType();
    assetParam.base_asset_code = baseAsset.getCode();
    assetParam.base_asset_issuer = baseAsset.getIssuer();
  }

  if (counterAsset.isNative()) {
    assetParam.counter_asset_type = counterAsset.getAssetType();
  } else {
    assetParam.counter_asset_type = counterAsset.getAssetType();
    assetParam.counter_asset_code = counterAsset.getCode();
    assetParam.counter_asset_issuer = counterAsset.getIssuer();
  }

  return axios.get(`${process.env.REACT_APP_HORIZON}/trade_aggregations`, { params: { ...assetParam, ...params } });
}

export function fetchTradeAPI(baseAsset, counterAsset, params) {
  const assetParam = {};
  if (baseAsset.isNative()) {
    assetParam.base_asset_type = baseAsset.getAssetType();
  } else {
    assetParam.base_asset_type = baseAsset.getAssetType();
    assetParam.base_asset_code = baseAsset.getCode();
    assetParam.base_asset_issuer = baseAsset.getIssuer();
  }

  if (counterAsset.isNative()) {
    assetParam.counter_asset_type = counterAsset.getAssetType();
  } else {
    assetParam.counter_asset_type = counterAsset.getAssetType();
    assetParam.counter_asset_code = counterAsset.getCode();
    assetParam.counter_asset_issuer = counterAsset.getIssuer();
  }

  return axios.get(`${process.env.REACT_APP_HORIZON}/trades`, { params: { ...assetParam, ...params } });
}

export function fetchOrderBookAPI(selling, buying, params) {
  const assetParam = {};
  if (selling.isNative()) {
    assetParam.selling_asset_type = selling.getAssetType();
  } else {
    assetParam.selling_asset_type = selling.getAssetType();
    assetParam.selling_asset_code = selling.getCode();
    assetParam.selling_asset_issuer = selling.getIssuer();
  }

  if (buying.isNative()) {
    assetParam.buying_asset_type = buying.getAssetType();
  } else {
    assetParam.buying_asset_type = buying.getAssetType();
    assetParam.buying_asset_code = buying.getCode();
    assetParam.buying_asset_issuer = buying.getIssuer();
  }

  return axios.get(`${process.env.REACT_APP_HORIZON}/order_book`, { params: { ...assetParam, ...params } });
}

export function fetchOffersOfAccount(account, params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/accounts/${account}/offers`, {
    params: {
      order: 'desc',
      ...params,
    },
  });
}

export function fetchTradesOfAccount(account, params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/accounts/${account}/trades`, {
    params: {
      order: 'desc',
      ...params,
    },
  });
}

export function checkAssetAPI(assetCode, assetIssuer) {
  return global
    .fetch(
      `${process.env.REACT_APP_HORIZON}/assets?asset_code=${assetCode}&asset_issuer=${assetIssuer}`,
    )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return false;
    })
    .then((res) => {
      if (res === false) {
        return false;
      }

      if (res._embedded.records.length > 0) {
        return true;
      }

      return false;
    })
    .catch(() => false);
}
