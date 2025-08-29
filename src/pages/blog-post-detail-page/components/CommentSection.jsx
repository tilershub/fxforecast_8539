import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "Excellent breakdown of the FXFORECAST framework! I've been struggling with risk management and this really clarifies the approach. The ADR exit strategy is particularly insightful.",
      timestamp: new Date(Date.now() - 3600000),
      likes: 12,
      replies: [
        {
          id: 11,
          author: {
            name: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          content: "Totally agree! The risk discipline aspect has transformed my trading approach.",
          timestamp: new Date(Date.now() - 1800000),
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Quick question about the position sizing calculator - does it account for different pip values across currency pairs? I trade mostly JPY pairs and want to make sure I'm calculating correctly.",
      timestamp: new Date(Date.now() - 7200000),
      likes: 8,
      replies: []
    },
    {
      id: 3,
      author: {
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: "This is exactly what I needed! Been looking for a systematic approach to forex trading. The session focus concept makes so much sense now.",
      timestamp: new Date(Date.now() - 10800000),
      likes: 15,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date?.toLocaleDateString();
  };

  const handleSubmitComment = (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    const comment = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (e, commentId) => {
    e?.preventDefault();
    if (!replyContent?.trim()) return;

    const reply = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      },
      content: replyContent,
      timestamp: new Date(),
      likes: 0
    };

    setComments(comments?.map(comment => 
      comment?.id === commentId 
        ? { ...comment, replies: [...comment?.replies, reply] }
        : comment
    ));
    
    setReplyContent('');
    setReplyingTo(null);
  };

  const displayedComments = showAllComments ? comments : comments?.slice(0, 3);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <Icon name="MessageCircle" size={24} className="mr-2" />
          Comments ({comments?.length})
        </h2>
      </div>
      {/* Comment Form */}
      <div className="bg-muted/30 rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmitComment}>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Share your thoughts about this article..."
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Be respectful and constructive in your comments
                </span>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={!newComment?.trim()}
                  iconName="Send"
                  iconPosition="right"
                  iconSize={14}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Comments List */}
      <div className="space-y-6">
        {displayedComments?.map((comment) => (
          <div key={comment?.id} className="bg-card border border-border rounded-lg p-6">
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={comment?.author?.avatar}
                    alt={comment?.author?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{comment?.author?.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {formatTimeAgo(comment?.timestamp)}
                  </span>
                </div>
              </div>
            </div>

            {/* Comment Content */}
            <p className="text-foreground leading-relaxed mb-4">{comment?.content}</p>

            {/* Comment Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ThumbsUp"
                iconPosition="left"
                iconSize={14}
                className="text-muted-foreground hover:text-foreground"
              >
                {comment?.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment?.id ? null : comment?.id)}
                iconName="Reply"
                iconPosition="left"
                iconSize={14}
                className="text-muted-foreground hover:text-foreground"
              >
                Reply
              </Button>
            </div>

            {/* Reply Form */}
            {replyingTo === comment?.id && (
              <form onSubmit={(e) => handleSubmitReply(e, comment?.id)} className="mt-4 ml-13">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                      alt="Your avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={`Reply to ${comment?.author?.name}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e?.target?.value)}
                      className="mb-2"
                    />
                    <div className="flex space-x-2">
                      <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        disabled={!replyContent?.trim()}
                      >
                        Reply
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Replies */}
            {comment?.replies?.length > 0 && (
              <div className="mt-6 ml-13 space-y-4">
                {comment?.replies?.map((reply) => (
                  <div key={reply?.id} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={reply?.author?.avatar}
                          alt={reply?.author?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-medium text-foreground text-sm">{reply?.author?.name}</h5>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(reply?.timestamp)}
                          </span>
                        </div>
                        <p className="text-foreground text-sm leading-relaxed mb-2">{reply?.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ThumbsUp"
                          iconPosition="left"
                          iconSize={12}
                          className="text-muted-foreground hover:text-foreground text-xs"
                        >
                          {reply?.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Load More Comments */}
      {comments?.length > 3 && !showAllComments && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllComments(true)}
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
          >
            Show {comments?.length - 3} More Comments
          </Button>
        </div>
      )}
    </section>
  );
};

export default CommentSection;