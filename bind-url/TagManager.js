import { bindUrls } from 'httpclient-module'

class TagManager extends BaseModule {
  constructor() {
    bindUrls({
      createTag: '/tags',
      getTagPageableList: '/tags',
      getTagFullList: '/tags/all',
      getTag: '/tags/:id',
      updateTag: '/tags/:id',
      deleteTag: '/tags/:id',
    })(this)
  }
}
