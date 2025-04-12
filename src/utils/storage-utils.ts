
import { supabase } from '@/integrations/supabase/client';

export const ensureStorageBucket = async (bucketName: string) => {
  try {
    // Check if the bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: true // Make the bucket public (for easy access in this demo)
      });
      
      if (error) {
        console.error(`Error creating bucket ${bucketName}:`, error);
        return false;
      }
      
      console.log(`Bucket ${bucketName} created successfully`);
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring storage bucket:', error);
    return false;
  }
};
