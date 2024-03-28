import fetcher from '@/libs/fetcher';
import { TopicModel } from '@/models/topic';

const topicServices = {
  queryTopics() {
    return fetcher.clientReq<TopicModel[]>(`topics`);
  },

  queryTopicsServer() {
    return fetcher.serverReq<TopicModel[]>(`topics`);
  },
};

export default topicServices;
