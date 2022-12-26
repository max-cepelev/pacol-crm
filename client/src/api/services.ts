import $api, { API_URL } from '.'

interface GetServiceParams {
  path: string
  params?: any
}

export const getService = async <T>({ path, params }: GetServiceParams) => {
  const { data } = await $api.get<T>(API_URL + path, {
    params,
    paramsSerializer: {
      indexes: null,
    },
  })
  return data
}

interface PostServiceParams<D> {
  path: string
  data: D
}

export const postService = async <T, D>({
  path,
  data: postData,
}: PostServiceParams<D>) => {
  const { data } = await $api.post<T>(API_URL + path, postData)
  return data
}

interface PatchServiceParams<D> {
  id: number
  path: string
  data: D
}

export const patchService = async <T, D>({
  id,
  path,
  data: postData,
}: PatchServiceParams<D>) => {
  const { data } = await $api.patch<T>(API_URL + path + '/' + id, postData)
  return data
}

interface DeleteServiceParams {
  path: string
}

export const deleteService = async <T>({ path }: DeleteServiceParams) => {
  const { data } = await $api.delete<T>(API_URL + path)
  return data
}
