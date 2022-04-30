<?php

namespace App\Observers;

use App\Models\BlogPost;
use Carbon\Carbon;

class BlogPostObserver
{
    /**
     * Handle the BlogPost "created" event.
     *
     * @param  \App\Models\Models\BlogPost  $blogPost
     * @return void
     */
    public function created(BlogPost $blogPost)
    {
        //
    }
    
    /**
     * Handle the BlogPost "updating" event.
     *
     * @param  \App\Models\Models\BlogPost  $blogPost
     * @return void
     */
    public function updating(BlogPost $blogPost)
    {
        $test[] = $blogPost->isDirty();
        $test[] = $blogPost->isDirty('is_published');
        $test[] = $blogPost->isDirty('user_id');
        $test[] = $blogPost->getAttribute('is_published');
        $test[] = $blogPost->is_published;
        $test[] = $blogPost->getOriginal('is_published');
        //dd($test);

        $this->setPublishedAt($blogPost);
        $this->setSlug($blogPost);
    }
    
    protected function setPublishedAt(BlogPost $blogPost)    
    {
        $a = empty($blogPost->published_at) && $blogPost->is_published;
        //dd($a);
        if($a) {
            $blogPost->published_at = Carbon::now();
        }
    }
    protected function setSlug(BlogPost $blogPost)
    {
        if(empty($blogPost->slug)) {
            $blogPost->slug = \Str::slug($blogPost->title);
        }

    }

    /**
     * Handle the BlogPost "updated" event.
     *
     * @param  \App\Models\Models\BlogPost  $blogPost
     * @return void
     */
    public function updated(BlogPost $blogPost)
    {
        //
    }

    /**
     * Handle the BlogPost "deleted" event.
     *
     * @param  \App\Models\Models\BlogPost  $blogPost
     * @return void
     */
    public function deleted(BlogPost $blogPost)
    {
        //
    }

    /**
     * Handle the BlogPost "restored" event.
     *
     * @param  \App\Models\Models\BlogPost  $blogPost
     * @return void
     */
    public function restored(BlogPost $blogPost)
    {
        //
    }

    /**
     * Handle the BlogPost "force deleted" event.
     *
     * @param  \App\Models\Models\BlogPost  $blogPost
     * @return void
     */
    public function forceDeleted(BlogPost $blogPost)
    {
        //
    }
}
